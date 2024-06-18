import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import UserAvatar from '@/components/UserAvatar'
import FiveStars from '@/components/FiveStars'
import { ArrowRight, Check, Star, User } from 'lucide-react'
import Image from 'next/image'
import { Reviews } from '@/components/Reviews'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
const list = [
  'High -quality, durable material',
  '5 year warranty',
  'Modern Phone models supported',
]

const list2 = [
  'High-quality silicone material',
  'Scratch- and fingerprint resistant coating',
  'Wireless charging compatible',
  '5 year print warranty',
]

export default function Home() {
  return (
    <>
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24  xl:pt-32 ">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4 ">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className=" absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src="/snake-1.png"
                  width={633}
                  height={834}
                  className="w-full"
                  alt=""
                />
              </div>
              <h1 className=" relative w-fit tracking-tight text-balance mt-10 lg:mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{' '}
                <span className="bg-gradient-to-r from-teal-700 to-green-400 px-2 text-white">
                  Custom
                </span>{' '}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with our exclusive,
                <span className=" font-semibold"> one-of-one </span> designs
                that safeguard not just your device, but your most cherished
                moments
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-start">
                {list.map((item, index) => (
                  <li
                    key={item}
                    className=" flex gap-1.5 items-center text-left">
                    <Check className="w-6 h-6 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center  gap-5">
                <div className="flex -space-x-4">
                  <UserAvatar userAvatar="/users/user-1.png" />
                  <UserAvatar userAvatar="/users/user-2.png" />
                  <UserAvatar
                    userAvatar="/users/user-5.jpg"
                    classStyle="object-cover"
                  />
                  <UserAvatar userAvatar="/users/user-4.jpg" />
                  <UserAvatar userAvatar="/users/user-3.png" />
                </div>
                <div className="flex flex-col gap-1 justify-between items-center sm:items-start">
                  <FiveStars />
                  <p>
                    <span className="font-semibold pr-1">12,500</span>Happy
                    customers{' '}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-12 sm:mt-32 lg:mx-0 lg:mt-20 h-fit ">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.png"
                alt=""
                width={619}
                height={428}
                className=" absolute w-40 lg:w-[12.5rem] left-[10rem] -top-32 z-[99] select-none hidden sm:block"
              />

              <Image
                src="/line.png"
                alt=""
                width={150}
                height={300}
                className="absolute w-20 -left-5 -bottom-6 select-none"
              />

              <Phone className="w-64" imgSrc="/testimonials/portrait_1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section className=" bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 text-center tracking-tight text-balance mt-2 font-bold !leading-tight text-gray-900 text-4xl md:text-5xl">
              What our{' '}
              <span className=" relative px-2">
                customers{' '}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 top-6 text-green-500" />{' '}
              </span>{' '}
              say
            </h2>
            <Image
              width={761}
              height={675}
              src="/snake-2.png"
              className="w-24 order-0 sm:order-2"
              alt=""
            />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 ">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8">
              <FiveStars />
              <div className="text-lg leading-8">
                <p>
                  {' '}
                  &ldquo;The case feels durable and I even got a compliment on
                  the design. Had the case for two and a half months now and{' '}
                  <span className="p-0.5 bg-slate-800 text-white">
                    {' '}
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it.&rdquo;
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/users/user-1.png"
                  width={300}
                  height={300}
                  alt="user"
                  className=" rounded-full h-12 w-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className=" font-semibold">John</p>
                  <div className=" flex gap-2 items-center text-zinc-600">
                    <Check className=" text-green-600 h-4 w-4 stroke-[3px]" />
                    <p className=" text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8">
              <FiveStars />
              <div className="text-lg leading-8">
                <p>
                  {' '}
                  &ldquo;I usually keep my phone together with my keys in my
                  pocket and that led to some pretty heavy scratchmarks on all
                  of my last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className="p-0.5 bg-slate-800 text-white">
                    looks brand new after about half a year
                  </span>
                  . I dig it.&rdquo;
                </p>
              </div>
              <div className="flex gap-4">
                <Image
                  src="/users/user-3.png"
                  width={300}
                  height={300}
                  alt="user"
                  className=" rounded-full h-12 w-12 object-cover"
                />
                <div className="flex flex-col">
                  <p className=" font-semibold">Jane</p>
                  <div className=" flex gap-2 items-center text-zinc-600">
                    <Check className=" text-green-600 h-4 w-4 stroke-[3px]" />
                    <p className=" text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <h2 className=" text-center tracking-tight text-balance mt-2 font-bold !leading-tight text-gray-900 text-4xl md:text-5xl">
              Upload your photo and get{' '}
              <span className=" relative px-2 bg-gradient-to-r from-teal-700 to-green-400 text-white">
                your own case{' '}
              </span>{' '}
              now
            </h2>
          </div>
          <div className=" mx-auto max-w-6xl px-6 lg:px-8">
            <div className=" relative flex flex-col items-center md:grid grid-cols-2 gap-40 ">
              <Image
                src="/arrow.png"
                alt=" "
                width={126}
                height={31}
                className="absolute top-[25rem] md:top-1/2  z-10 left-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
              />
              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl  lg:rounded-2xl">
                <Image
                  src="/kid.jpg"
                  width={853}
                  height={1280}
                  className="rounded-md object-cover bg-white shadow-2xl ring-2 ring-gray-900/10 h-full w-full"
                  alt=" "
                />
              </div>
              <Phone imgSrc="/kid_phone.jpg" className="w-60" />
            </div>
          </div>
          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            {list2.map((item, index) => (
              <li key={index} className="w-fit">
                <Check className="h-5 w-5 text-green-600 inline mr-1.5" />
                {item}
              </li>
            ))}
            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: 'lg',
                  variant: 'link',
                  className: 'mx-auto mt-8',
                })}
                href="/configure/upload">
                Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
