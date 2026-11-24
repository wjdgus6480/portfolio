import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";

/**
 * Hero 3D 장면: "데이터 · 연결 · 구조"를 표현한 네트워크 구.
 * - 바깥: 구 표면의 노드와 가까운 노드끼리 이은 선(연결)
 * - 안쪽: 천천히 반대로 도는 정이십면체 골격(엔진 · 구조)
 * - 선 위를 흘러가는 점(데이터가 흐르며 처리되는 과정)
 *
 * React와 분리된 순수 three.js 모듈이다. HeroCanvas가 dynamic import로만 불러와
 * 첫 화면 번들에 three.js가 포함되지 않는다. dispose()가 GPU 자원을 모두 정리한다.
 */

// globals.css 브랜드 토큰과 같은 값 (--accent, --accent-vivid, --background)
const ACCENT = 0x1b64da;
const ACCENT_VIVID = 0x3182f6;
const BACKGROUND = 0xffffff;

export type NetworkSceneOptions = {
  /** 모바일 · 터치 기기: 노드 수와 해상도를 줄이고 흐르는 점을 뺀다 */
  lite: boolean;
  /** 동작 줄이기: 한 장면만 그리고 움직이지 않는다 */
  reducedMotion: boolean;
};

export type NetworkScene = {
  setPointer: (x: number, y: number) => void;
  setActive: (active: boolean) => void;
  dispose: () => void;
};

const RADIUS = 2;

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    // 완전한 구보다 살짝 흐트러진 표면이 더 "데이터"처럼 보인다 (고정 시드라 매번 같은 모양)
    const noise = (seed: number) => (((Math.sin(seed) * 43758.5453) % 1) + 1) % 1 - 0.5;
    const p = new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r);
    p.add(new THREE.Vector3(noise(i * 12.9898), noise(i * 78.233), noise(i * 37.719)).multiplyScalar(0.16));
    points.push(p.normalize().multiplyScalar(radius * (1 + noise(i * 4.1414) * 0.14)));
  }
  return points;
}

/** 각 노드를 가장 가까운 k개와 잇는다. 중복 간선은 한 번만. */
function nearestEdges(points: THREE.Vector3[], k: number) {
  const edges: [number, number][] = [];
  const seen = new Set<string>();
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: j === i ? Infinity : p.distanceToSquared(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([i, j]);
    }
  });
  return edges;
}

function dotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,1)");
  g.addColorStop(0.7, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createNetworkScene(container: HTMLElement, options: NetworkSceneOptions): NetworkScene {
  const { lite, reducedMotion } = options;

  const renderer = new THREE.WebGLRenderer({
    antialias: !lite,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // 뒤쪽 노드는 흰 배경으로 사라지게 해 깊이를 만든다
  scene.fog = new THREE.Fog(BACKGROUND, 8.4, 13);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  const root = new THREE.Group();
  root.rotation.set(0.35, 0, 0.12);
  scene.add(root);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(item: T) => {
    disposables.push(item);
    return item;
  };

  // --- 노드와 연결선 ---
  const points = fibonacciSphere(lite ? 90 : 150, RADIUS);
  const edges = nearestEdges(points, 3);

  const linePositions = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    points[a].toArray(linePositions, i * 6);
    points[b].toArray(linePositions, i * 6 + 3);
  });
  // 기본 선(1 기기 픽셀)은 고해상도 화면에서 머리카락처럼 가늘어져, 화면 기준 두께를 갖는 선을 쓴다
  const lineGeometry = track(new LineSegmentsGeometry().setPositions(linePositions));
  const lineMaterial = track(
    new LineMaterial({ color: ACCENT_VIVID, linewidth: 1.25, transparent: true, opacity: 0.72, depthWrite: false }),
  );
  root.add(new LineSegments2(lineGeometry, lineMaterial));

  const texture = track(dotTexture());
  const nodeGeometry = track(new THREE.BufferGeometry().setFromPoints(points));
  const nodeMaterial = track(
    new THREE.PointsMaterial({
      color: ACCENT,
      size: 0.1,
      map: texture,
      transparent: true,
      alphaTest: 0.05,
      depthWrite: false,
    }),
  );
  root.add(new THREE.Points(nodeGeometry, nodeMaterial));

  // 허브 노드: 연결이 모이는 지점을 크게 표시
  const hubs = points.filter((_, i) => i % 13 === 0);
  const hubGeometry = track(new THREE.BufferGeometry().setFromPoints(hubs));
  const hubMaterial = track(
    new THREE.PointsMaterial({ color: ACCENT_VIVID, size: 0.2, map: texture, transparent: true, depthWrite: false }),
  );
  root.add(new THREE.Points(hubGeometry, hubMaterial));

  // --- 안쪽 골격 ---
  const coreSource = track(new THREE.IcosahedronGeometry(0.95, 1));
  const coreEdges = track(new THREE.EdgesGeometry(coreSource));
  const coreGeometry = track(new LineSegmentsGeometry().fromEdgesGeometry(coreEdges));
  const coreMaterial = track(
    new LineMaterial({ color: ACCENT, linewidth: 1.3, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  const core = new LineSegments2(coreGeometry, coreMaterial);
  root.add(core);

  // --- 궤도: 구 바깥의 기울어진 고리 ---
  const orbitCurve = new THREE.EllipseCurve(0, 0, RADIUS * 1.32, RADIUS * 1.32);
  const orbitGeometry = track(new THREE.BufferGeometry().setFromPoints(orbitCurve.getPoints(160)));
  const orbitMaterial = track(
    new THREE.LineDashedMaterial({
      color: ACCENT_VIVID,
      transparent: true,
      opacity: 0.5,
      dashSize: 0.06,
      gapSize: 0.08,
      depthWrite: false,
    }),
  );
  const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
  orbit.computeLineDistances();
  orbit.rotation.set(Math.PI / 2.3, 0.4, 0);
  scene.add(orbit);

  // --- 흐르는 데이터: 간선을 따라 이동하고, 끝에 닿으면 이웃 간선으로 넘어간다 ---
  const neighbors = new Map<number, number[]>();
  for (const [a, b] of edges) {
    neighbors.set(a, [...(neighbors.get(a) ?? []), b]);
    neighbors.set(b, [...(neighbors.get(b) ?? []), a]);
  }
  const packetCount = lite || reducedMotion ? 0 : 16;
  const packets = Array.from({ length: packetCount }, (_, i) => {
    const [from, to] = edges[(i * 37) % edges.length];
    return { from, to, t: (i * 0.173) % 1, speed: 0.45 + ((i * 7) % 5) * 0.12 };
  });
  const packetPositions = new Float32Array(Math.max(packetCount, 1) * 3);
  const packetGeometry = track(new THREE.BufferGeometry());
  packetGeometry.setAttribute("position", new THREE.BufferAttribute(packetPositions, 3));
  const packetMaterial = track(
    new THREE.PointsMaterial({ color: ACCENT_VIVID, size: 0.16, map: texture, transparent: true, depthWrite: false }),
  );
  const packetPoints = new THREE.Points(packetGeometry, packetMaterial);
  packetPoints.visible = packetCount > 0;
  root.add(packetPoints);

  const scratch = new THREE.Vector3();
  const updatePackets = (dt: number) => {
    packets.forEach((packet, i) => {
      packet.t += dt * packet.speed;
      if (packet.t >= 1) {
        const next = neighbors.get(packet.to) ?? [packet.from];
        const choices = next.filter((n) => n !== packet.from);
        const pick = (choices.length ? choices : next)[Math.floor(Math.random() * (choices.length || next.length))];
        packet.from = packet.to;
        packet.to = pick;
        packet.t = 0;
      }
      scratch.lerpVectors(points[packet.from], points[packet.to], packet.t).toArray(packetPositions, i * 3);
    });
    packetGeometry.attributes.position.needsUpdate = true;
  };
  if (packetCount > 0) updatePackets(0);

  // --- 크기 ---
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    lineMaterial.resolution.set(w, h);
    coreMaterial.resolution.set(w, h);
    camera.aspect = w / h;
    // 세로로 긴 영역에서도 구가 좌우로 잘리지 않게 카메라를 뒤로 뺀다
    camera.position.z = camera.aspect < 1 ? 9 / Math.max(camera.aspect, 0.55) : 9;
    camera.updateProjectionMatrix();
    if (!running) renderer.render(scene, camera);
  };

  // --- 포인터 반응 ---
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };

  let running = false;
  let frame = 0;
  let last = 0;
  let spin = 0;

  const tick = (time: number) => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min((time - (last || time)) / 1000, 0.05);
    last = time;

    spin += dt * 0.09;
    tilt.x += (pointer.y * 0.28 - tilt.x) * Math.min(dt * 3, 1);
    tilt.y += (pointer.x * 0.42 - tilt.y) * Math.min(dt * 3, 1);

    root.rotation.x = 0.35 + tilt.x;
    root.rotation.y = spin + tilt.y;
    root.position.y = Math.sin(time / 2400) * 0.06;
    core.rotation.y = -spin * 1.8;
    core.rotation.x = spin * 0.6;
    orbit.rotation.z = spin * 0.5;

    if (packetCount > 0) updatePackets(dt);
    renderer.render(scene, camera);
  };

  const start = () => {
    if (running || reducedMotion) return;
    running = true;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  renderer.render(scene, camera);
  start();

  return {
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    setActive(active) {
      if (active) start();
      else stop();
    },
    dispose() {
      stop();
      observer.disconnect();
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
