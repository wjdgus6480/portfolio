'use client'

import { createClient } from '@/utils/supabase/client'

export default function AdminPage() {
  const handleKakaoLogin = async () => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    })

    if (error) {
      console.error('Kakao login error:', error)
      alert('카카오 로그인에 실패했습니다.')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Portfolio Admin
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            관리자 로그인
          </h1>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            포트폴리오 관리 기능을 사용하려면 로그인해주세요.
          </p>
        </div>

        <button
          type="button"
          onClick={handleKakaoLogin}
          className="flex w-full items-center justify-center rounded-xl bg-[#FEE500] px-4 py-3 text-sm font-semibold text-zinc-900 transition hover:brightness-95"
        >
          카카오로 로그인
        </button>
      </div>
    </main>
  )
}