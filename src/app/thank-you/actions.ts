'use server'

import { fetchUser } from '@/actions/fetchUser'
import { db } from '@/db'

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const user = await fetchUser()
  if (!user || !user.id) throw new Error('You need to be logged in')

  const order = await db.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      shippingAddress: true,
      billingAddress: true,
      configuration: true,
      user: true,
    },
  })

  if (!order) throw new Error('This order does not exist')
  if (order) {
    return order
  } else {
    return false
  }
}
