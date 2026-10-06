-- 1. 관리자
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- 관리자 여부 확인 함수
create schema if not exists private;

create or replace function private.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke execute on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;


-- 2. 방문자 문의
create table public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text,
  message text not null,
  status text not null default 'unread'
    check (status in ('unread', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;


-- 방문자는 문의 등록만 가능
create policy "Anyone can create inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (
  length(trim(name)) between 1 and 100
  and (email is null or length(trim(email)) <= 320)
  and length(trim(message)) between 1 and 5000
);

-- 관리자만 문의 조회
create policy "Admins can read inquiries"
on public.inquiries
for select
to authenticated
using ((select private.is_admin()));

-- 관리자만 문의 수정
create policy "Admins can update inquiries"
on public.inquiries
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

-- 관리자만 문의 삭제
create policy "Admins can delete inquiries"
on public.inquiries
for delete
to authenticated
using ((select private.is_admin()));