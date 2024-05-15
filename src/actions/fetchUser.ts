'use server'

import { auth } from '@/auth'

export const fetchUser = async () => {
  const session = await auth()
  return session?.user
}
