import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignConfigurator from './DesignConfigurator'

interface PageProps {
  searchParams: {
    [key: string]: string | undefined | string[]
  }
}
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams
  if (!id || typeof id !== 'string') {
    return notFound()
  }
  const configuration = await db.configure.findUnique({ where: { id } })

  if (!configuration) {
    return notFound()
  }

  const { width, height, imageUrl } = configuration

  return (
    <DesignConfigurator
      configurationId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{ width, height }}
    />
  )
}

export default Page
