import { NextResponse } from 'next/server'
import Replicate from 'replicate'

enum WebhookEventType {
  Start = 'start',
  Completed = 'completed',
}

// Update your interface to use WebhookEventType:
interface PredictionOptions {
  version: string
  input: {
    prompt: any
    output_format?: string
    steps?: number
    num_inference_steps?: number
    negative_prompt?: string
    num_outputs?: number
    width?: number
    height?: number
  }
  webhook?: string
  webhook_events_filter?: WebhookEventType[]
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST

export async function POST(request: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    )
  }

  const { prompt } = await request.json()

  const options: PredictionOptions = {
    version: process.env.REPLICATE_MODEL_ID as string,
    input: {
      prompt,
      width: 1024,
      height: 1024,
      num_outputs: 1,
      negative_prompt: 'worst quality, low quality',
      num_inference_steps: 4,
    },
  }

  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}/api/image-webhooks`
    options.webhook_events_filter = [
      WebhookEventType.Start,
      WebhookEventType.Completed,
    ]
  }

  const prediction = await replicate.predictions.create(options)

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 })
  }

  return NextResponse.json(prediction, { status: 201 })
}
