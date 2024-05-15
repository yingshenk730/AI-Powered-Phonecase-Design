import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
// import sharp from 'sharp'
import sharp from 'sharp'
import { db } from '@/db'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configureId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configureId } = metadata.input
      const res = await fetch(file.url)
      const buffer = await res.arrayBuffer()
      const imageMetadata = await sharp(buffer).metadata()
      const { width, height } = imageMetadata
      if (!configureId) {
        const configuration = await db.configure.create({
          data: {
            width: width || 500,
            height: height || 500,
            imageUrl: file.url,
          },
        })
        return { configureId: configuration.id }
      } else {
        const updatedConfiguration = await db.configure.update({
          where: {
            id: configureId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        })
        return { configureId: updatedConfiguration.id }
      }

      return { configureId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
