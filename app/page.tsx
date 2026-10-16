import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import TrackerApp from './tracker'
import { AUTH_COOKIE, isValidToken } from './auth'

export default async function Home() {
  const cookieStore = cookies()
  if (!isValidToken(cookieStore.get(AUTH_COOKIE)?.value)) redirect('/login')
  return <TrackerApp />
}
