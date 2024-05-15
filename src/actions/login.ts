'use server'
import { signIn } from '@/auth'
import { getUserByEmail } from '@/data/user'
import { db } from '@/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { LoginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid form data' }
  }
  const { email, password } = validatedFields.data

  const exsitingUser = await getUserByEmail(email)

  if (!exsitingUser) {
    return { error: 'User not found' }
  }

  try {
    console.log('firing signIn')
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }
    throw error
  }
}
