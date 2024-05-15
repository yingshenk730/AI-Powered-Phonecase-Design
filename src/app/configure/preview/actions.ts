'use server'
import { auth } from '@/auth'
import { db } from '@/db'
import { stripe } from '@/lib/stripe'
import { Order } from '@prisma/client'

export const createCheckoutSession = async ({
  configurationId,
  price,
}: {
  configurationId: string
  price: number
}) => {
  const configuration = await db.configure.findUnique({
    where: { id: configurationId },
  })
  if (!configuration) {
    throw new Error('Configuration not found')
  }
  const session = await auth()
  console.log('session', session)
  if (!session || !session.user) {
    throw new Error('You need to be logged in')
  }

  const exsitingOrder = await db.order.findFirst({
    where: {
      userId: session.user.id,
      configurationId: configuration.id,
    },
  })
  let order: Order | undefined = undefined
  if (exsitingOrder) {
    order = exsitingOrder
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: session.user.id!,
        configurationId: configuration.id,
      },
    })
  }
  console.log('order', order)
  const product = await stripe.products.create({
    name: 'Custom iPhone case',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'usd',
      unit_amount: price,
    },
  })
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    metadata: {
      userId: session.user.id!,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  })
  return { url: stripeSession.url }
}
