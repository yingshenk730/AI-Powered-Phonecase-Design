import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col py-12 items-center justify-center">
      {children}
    </div>
  )
}

export default AuthLayout