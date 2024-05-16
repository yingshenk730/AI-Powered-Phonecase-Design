import { cn } from '@/lib/utils'
import { Card, CardHeader, CardFooter } from '../ui/card'
import { Poppins } from 'next/font/google'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export const ErrorCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className={cn('text-2xl font-semibold', font.className)}>
            {' '}
            Oops!{' '}
          </h1>
          <p className="text-muted-foreground text-sm">Something went wrong</p>
        </div>
      </CardHeader>

      <CardFooter>
        <Link
          className={buttonVariants({
            variant: 'link',
            className: 'w-full',
            size: 'sm',
          })}
          href="/auth/login">
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  )
}
