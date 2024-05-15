'use server'
import { db } from '@/db'
import { notFound } from 'next/navigation'
import React from 'react'
import DesignPreview from './DesignPreview'
import { auth } from '@/auth'

interface PreviewPageProps {
  searchParams: {
    [key: string]: string | undefined | string[]
  }
}

const PreviewPage = async ({ searchParams }: PreviewPageProps) => {
  const session = await auth()
  console.log('session', session)
  const { id } = searchParams
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configure.findUnique({ where: { id } })
  if (!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration} />
}

export default PreviewPage
