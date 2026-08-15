import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import TrackerApp from './tracker'

export default async function Home() {
  const cookieStore = cookies()
  const auth = cookieStore.get('auth')
  if (auth?.value !== process.env.APP_PASSWORD) redirect('/login')
  return <TrackerApp />
}
