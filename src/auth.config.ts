import type { NextAuthConfig } from 'next-auth'
import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { LoginSchema } from './schemas'
import { getUserByEmail } from './data/user'
import { db } from './db'

const credentialProvider = Credentials({
  async authorize(credentials) {
    const validatedFields = LoginSchema.safeParse(credentials)

    if (validatedFields.success) {
      const { email, password } = validatedFields.data

      const user = await db.user.findUnique({
        where: {
          email,
        },
      })
      if (!user || !user.password) return null
      const passwordsMatch = await bcrypt.compare(password, user.password)
      if (passwordsMatch) return user
    }
    return null
  },
})
export default {
  providers: [Google, credentialProvider],
} satisfies NextAuthConfig
