'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUploadThing } from '@/lib/uploadthing'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { Prediction } from 'replicate'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const Page = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configureId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
  })
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const promptValue = formData.get('prompt') as string
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptValue,
      }),
    })
    let prediction = await response.json()
    if (response.status !== 201) {
      setError(prediction.detail)
      return
    }
    setPrediction(prediction)

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000)
      const response = await fetch('/api/predictions/' + prediction.id)
      prediction = await response.json()
      if (response.status !== 200) {
        setError(prediction.detail)
        return
      }
      console.log({ prediction })
      setPrediction(prediction)
    }
  }
  const handleClick = async () => {
    try {
      const response = await fetch(prediction?.output[0])
      // console.log('response', response)
      const blob = await response.blob()

      const fileType = prediction?.output[0].split('.').pop()
      const file = new File([blob], `downloadedImage.${fileType}`, {
        type: blob.type,
      })

      const filesArray = [file]

      startUpload(filesArray, { configureId: undefined })
    } catch (error) {
      console.error('Failed to download and upload image:', error)
    }
  }
  return (
    <div className="">
      <h1 className="py-9 lg:py-16 text-center font-semibold pb-3 text-lg text-slate-700 lg:text-3xl">
        Generate an image by AI
      </h1>

      <form className="w-full flex gap-3" onSubmit={handleSubmit}>
        <Input
          placeholder="Example: An astronaut riding a rainbow unicorn"
          name="prompt"
          className="w-full"
        />
        <Button className="px-6" type="submit">
          Go!
        </Button>
      </form>
      {error && <div>{error}</div>}
      {prediction && (
        <>
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
          {prediction.output && (
            <div className="w-full flex flex-col items-center justify-center">
              {isUploading || isPending ? (
                <Button className="mt-6" isLoading={true} disabled={true}>
                  Loading
                  <Loader2 className="ml-2 w-5 h-5 animate-spin inline-block" />
                </Button>
              ) : (
                <Button className="mt-6" onClick={handleClick}>
                  Use this image
                </Button>
              )}
              <Image
                width={500}
                height={500}
                src={prediction.output[0]}
                alt="Generated image"
                className="mt-6 object-contain"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Page
