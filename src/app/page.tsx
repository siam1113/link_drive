'use client'

import Authenticator from '@/components/Authenticator'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <Authenticator isPassedToWithAuthenticator={true} />
    </main>
  )
}
