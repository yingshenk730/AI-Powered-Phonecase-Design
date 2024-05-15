'use client'
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { SocialPlatform } from './social-platform'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

interface CardWrapperProps {
  children: React.ReactNode
  header: string
  backBtnLabel: string
  backBtnHref: string
  showSocials?: boolean
}

export const CardWrapper = ({
  children,
  header,
  backBtnLabel,
  backBtnHref,
}: CardWrapperProps) => {
  const showSocials = true
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="text-center">
        <CardTitle className={cn('text-2xl font-semibold', font.className)}>
          {header}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter>
        <SocialPlatform />
      </CardFooter>

      <CardFooter>
        <Link
          className={buttonVariants({
            variant: 'link',
            className: 'w-full text-zinc-700 hover:text-primary',
            size: 'sm',
          })}
          href={backBtnHref}>
          {backBtnLabel}
        </Link>
      </CardFooter>
    </Card>
  )
}
