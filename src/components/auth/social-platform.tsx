'use client'
import { FcGoogle } from 'react-icons/fc'
// import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const SocialPlatform = () => {
  const handleSignIn = () => {
    signIn('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <Button variant="outline" className="w-full" onClick={handleSignIn}>
        <FcGoogle className=" w-5 h-5" />
        <p className=" ml-3 inline-block">Google</p>
      </Button>
    </div>
  )
}
