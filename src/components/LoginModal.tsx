import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" absolute z-[99999]">
        <DialogHeader>
          <div className="relative mx-auto w-24 h-24">
            <Image
              fill
              src="/snake-1.png"
              className="object-contain"
              alt="snake image"
            />
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tight text-gray-900 text-center">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-center text-base py-2">
            <span className="font-medium text-gray-900">
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex gap-6">
          <Link
            className={buttonVariants({
              variant: 'outline',
              className: 'flex-1',
            })}
            href="/auth/login">
            Login
          </Link>
          <Link
            className={buttonVariants({
              variant: 'default',
              className: 'flex-1',
            })}
            href="/auth/register">
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
