import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import LogoutBtn from './LogoutBtn'
import { auth } from '@/auth'

const Navbar = async () => {
  const session = await auth()
  // console.log('session: ', session)

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  const isAdmin = session?.user?.email === ADMIN_EMAIL

  return (
    <nav className=" sticky z-[100] inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className=" flex h-14 items-center justify-between">
          <Link href="/" className=" flex z-40 font-bold text-lg gradient-text">
            MakeYourCase
          </Link>
          <div className="h-full flex items-center ">
            {session?.user?.name ? (
              <>
                <Link href={`/profile/${session?.user?.id}`}>
                  <div className=" h-8 w-8 rounded-full bg-primary text-zinc-100 hover:font-bold flex items-center justify-center">
                    {`${session?.user.name.slice(0, 1).toUpperCase()}`}
                  </div>
                </Link>
                <LogoutBtn />
                {isAdmin && (
                  <Link
                    className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                    href="/dashboard">
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
