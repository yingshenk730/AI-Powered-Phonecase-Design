import type { Metadata } from 'next'
import { Inter, Recursive } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/Providers'
import { constructMetadata } from '@/lib/utils'

const recursive = Recursive({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={recursive.className}>
          <Providers>
            <Navbar />
            <main className="flex flex-col grainy-light ">
              <div className="size-full min-h-[calc(100vh-114px)]">
                {children}
              </div>
            </main>
            <Footer />
          </Providers>

          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
