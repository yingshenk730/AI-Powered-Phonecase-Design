'use client'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { buttonVariants } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { useUploadThing } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import {
  Image as DefaultImage,
  Loader2,
  MousePointerSquareDashed,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { ArrowRight } from 'lucide-react'

const Page = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const router = useRouter()

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configureId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p) {
      setUploadProgress(p)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles

    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported.`,
      description: 'Please choose a PNG, JPG, or JPEG image instead.',
      variant: 'destructive',
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configureId: undefined })

    setIsDragOver(false)
  }

  const [isPending, startTransition] = useTransition()

  return (
    <>
      <div
        className={cn(
          'relative flex-grow mt-9  rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center max-h-80',
          {
            'ring-blue-900/25 bg-blue-900/10': isDragOver,
          }
        )}>
        <div className="relative flex flex-1 flex-col items-center justify-center w-full">
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpeg'],
              'image/jpg': ['.jpg'],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                ) : isUploading || isPending ? (
                  <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                ) : (
                  <DefaultImage className="h-6 w-6 text-zinc-500 mb-2" />
                )}
                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className="mt-2 w-40 h-2 bg-gray-300"
                      />
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center">
                      <p>Redirecting, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop file</span> to upload
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>

                {isPending ? null : (
                  <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <Link
        href="/configure/generate-image"
        className={cn(buttonVariants({ variant: 'default' }), 'w-full')}>
        Generate an image by AI
        <ArrowRight className="ml-3 h-5 w-5 inline-block" />
      </Link>
    </>
  )
}

export default Page
