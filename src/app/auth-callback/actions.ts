'use server'

import { auth } from '@/auth'
// import { db } from '@/db'

export const getAuthStatus = async () => {
  const session = await auth()
  const user = session?.user
  if (!user) throw new Error('You need to be logged in')
  if (!user.id || !user.email) throw new Error('Invalid user data')

  return { success: true }
}
