'use client'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { User } from 'next-auth'
import { fetchUser } from '@/actions/fetchUser'
import { useQuery } from '@tanstack/react-query'

const Navbar = () => {
  const [username, setUsername] = useState<string | null>(null)
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser()
      if (user && user.name) {
        setUsername(user.name)
      }
    }
    getUser()
  })
  // console.log('username: ', username)
  const isAdmin = true

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className=" sticky z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className=" flex h-14 items-center justify-between">
          <Link href="/" className=" flex z-40 font-semibold">
            case <span className="text-green-600">cobra</span>
          </Link>
          <div className="h-full flex items-center ">
            {username ? (
              <>
                <div className="text-sm">{username}</div>
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
                {isAdmin && (
                  <Link
                    className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                    href="/">
                    Dashboard
                  </Link>
                )}

                <Link
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                  href="/configure/upload">
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex gap-0">
                  <Link
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                    href="/auth/register">
                    Sign up
                  </Link>
                  <Link
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                    href="/auth/login">
                    Login
                  </Link>
                </div>
                <div className="h-8 w-px mr-3 bg-zinc-200 hidden sm:block" />
                <Link
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                  href="/configure/upload">
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
