'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

const LogoutBtn = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }
  return (
    <Button size="sm" variant="ghost" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutBtn
