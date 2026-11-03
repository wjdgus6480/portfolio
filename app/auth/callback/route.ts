import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin'

  if (!code) {
    return NextResponse.redirect(`${origin}/admin?error=oauth_callback`)
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('OAuth callback error:', error.message)

    return NextResponse.redirect(
      `${origin}/admin?error=oauth_callback`
    )
  }

  return NextResponse.redirect(`${origin}${next}`)
}
