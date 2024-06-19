'use client'

import { cn } from '@/lib/utils'
// import { url } from 'inspector'
// import Image from 'next/image'
import { usePathname } from 'next/navigation'

const STEPS = [
  {
    name: 'Step 1: Add  image',
    description: 'Upload an image to get started',
    urls: ['/upload', '/generate-image'],
    imgSrc: '/snake-1.png',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make your phonecase',
    urls: ['/design'],
    imgSrc: '/snake-2.png',
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    urls: ['/preview'],
    imgSrc: '/snake-3.png',
  },
]

const Steps = () => {
  const pathname = usePathname()
  return (
    <ol className=" lg:flex">
      {STEPS.map((step, i) => {
        const isCurrent = step.urls.some((url) => pathname.endsWith(url))
        const isCompleted = STEPS.slice(i + 1).some((s) =>
          s.urls.some((url) => pathname.endsWith(url))
        )

        return (
          <li key={step.name} className="relative overflow-hidden lg:flex-1">
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-zinc-700': isCurrent,
                    'bg-primary': isCompleted,
                  }
                )}
                aria-hidden="true"
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className="flex-shrink-0">
                  {/* eslint-disable-next-line */}
                  <img
                    src={step.imgSrc}
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-zinc-700': isCurrent,
                      }
                    )}
                  />
                </span>

                <span className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center">
                  <span
                    className={cn('text-sm font-semibold text-zinc-700', {
                      'text-primary': isCompleted,
                      'text-zinc-700': isCurrent,
                    })}>
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className="absolute inset-0 hidden lg:block w-3 ">
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 12 82"
                    fill="none"
                    preserveAspectRatio="none">
                    <path
                      d="M0.5 0V31L10.5 41L0.5 51V82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps
