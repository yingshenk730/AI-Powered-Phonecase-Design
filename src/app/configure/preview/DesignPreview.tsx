'use client'
import Confetti from 'react-dom-confetti'
import { useState, useEffect } from 'react'
import { Configure } from '@prisma/client'
import Phone from '@/components/Phone'
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from '@/validators/option-validator'
import { cn, formatPrice } from '@/lib/utils'
import { ArrowRight, Check } from 'lucide-react'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { Button } from '@/components/ui/button'
import { createCheckoutSession } from './actions'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import LoginModal from '@/components/LoginModal'

const DesignPreview = ({ configuration }: { configuration: Configure }) => {
  const router = useRouter()
  const { toast } = useToast()

  const user = useCurrentUser()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  //eslint-disable-next-line
  useEffect(() => setShowConfetti(true))
  const configurationId = configuration.id

  const { color, model, finish, material } = configuration
  const twColor = COLORS.find((c) => c.value === color)?.tw
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!
  const materialPrice = PRODUCT_PRICES.material[material!]

  const { label: materialLabel } = MATERIALS.options.find(
    ({ value }) => value === material
  )!
  const { label: finishLabel } = FINISHES.options.find(
    ({ value }) => value === finish
  )!

  const finishPrice = PRODUCT_PRICES.finish[finish!]

  const totalPrice = BASE_PRICE + materialPrice + finishPrice

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      if (data && data.url) {
        router.push(data.url)
      } else {
        throw new Error('Error creating checkout session')
      }
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end, please try again later',
        variant: 'destructive',
      })
    },
  })

  const handleCheckout = () => {
    if (user) {
      createPaymentSession({ configurationId, price: totalPrice })
    } else {
      localStorage.setItem('configurationId', configurationId)
      //you need to login
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        className=" pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 360, startVelocity: 40 }}
        />
      </div>
      <LoginModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className=" mt-16 grid grid-cols-1 text-sm md:grid-cols-12 sm:gap-x-6 lg:gap-x-12 ">
        <div className="sm:col-span-4 lg:col-span-3 max-w-60 md:max-w-[400px] ">
          <Phone
            className={cn(`bg-${twColor}`)}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>
        <div className="mt-6 md:mt-0  sm:col-span-8">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} case
          </h3>
          <div className="flex mt-3 items-center gap-1.5 text-base">
            <Check className="w-4 h-4 text-green-500" />
            <p className="text-sm text-zinc-600">In Store and ready to ship</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 p-3 text-zinc-600">
            <div className="flex-1">
              <p className="font-semibold text-zinc-800 mb-2">Highlights</p>
              <ol className=" list-disc list-inside ">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-800 mb-2">Materials</p>
              <ol className=" list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="w-full h-px bg-zinc-300 mt-3" />
          <div className=" bg-zinc-200 rounded-lg my-6 ">
            <div className=" flow-root text-sm p-6">
              <div className="flex items-center justify-between pb-3">
                <p>Basic Price</p>
                <p>{formatPrice(BASE_PRICE / 100)}</p>
              </div>

              <div className="flex items-center justify-between pb-3">
                <p>{materialLabel} material</p>
                <p>{formatPrice(materialPrice / 100)}</p>
              </div>

              <div className="flex items-center justify-between">
                <p>{finishLabel}</p>
                <p>{formatPrice(finishPrice / 100)}</p>
              </div>
              <div className="w-full h-px bg-zinc-300 my-3 " />
              <div className="flex items-center justify-between font-semibold">
                <p>Total Price</p>
                <p>{formatPrice(totalPrice / 100)}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => handleCheckout()}>
              CheckOut
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
