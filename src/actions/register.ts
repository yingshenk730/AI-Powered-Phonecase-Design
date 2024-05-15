import { getUserByEmail } from '@/data/user'
import { db } from '@/db'
import { RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFileds = RegisterSchema.safeParse(values)
  if (!validatedFileds.success) {
    return { error: 'Invalid form data' }
  }

  const { username, email, password } = validatedFileds.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const exsitingUset = await getUserByEmail(email)
  if (exsitingUset) {
    return { error: 'User already exists' }
  }
  await db.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  })
  return { success: 'Account created' }
}
