import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        ' relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      <Image
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        alt=""
        width={896}
        height={1831}
        className="w-full pointer-events-none select-none z-50"
      />
      <div className=" absolute -z-10 inset-0">
        <Image
          src={imgSrc}
          alt=""
          width={896}
          height={1831}
          className="object-contain min-w-full min-h-full"
        />
      </div>
    </div>
  )
}

export default Phone
