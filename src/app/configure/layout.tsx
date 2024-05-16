import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Steps from '@/components/Steps'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="min-h-[calc(100vh-114px)] flex-1 flex flex-col py-6 ">
      <Steps />
      {children}
    </MaxWidthWrapper>
  )
}

export default Layout
