'use client'
import HandleComponent from '@/components/HandleComponent'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { cn, formatPrice } from '@/lib/utils'
import {
  COLORS,
  MODELS,
  MATERIALS,
  FINISHES,
} from '@/validators/option-validator'
import NextImage from 'next/image'
import { useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import {
  Radio,
  RadioGroup,
  Label as HeadlessuiLabel,
  Description,
} from '@headlessui/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react'
import { BASE_PRICE } from '@/config/products'
import { useUploadThing } from '@/lib/uploadthing'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { SaveConfigArgs, saveConfig as _saveConfig } from './actions'

interface DesignConfiguratorProps {
  imageDimensions: { width: number; height: number }
  configurationId: string
  imageUrl: string
}

const DesignConfigurator = ({
  imageDimensions,
  configurationId,
  imageUrl,
}: DesignConfiguratorProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ['save-config'],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), _saveConfig(args)])
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description:
          'There was a problem saving your config, please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configurationId}`)
    },
  })
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  const [renderedDimensions, setRenderedDimensions] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  })
  const [renderedPosition, setRenderedPosition] = useState({ x: 150, y: 200 })
  const phonecaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { startUpload } = useUploadThing('imageUploader')

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phonecaseRef.current!.getBoundingClientRect()
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop

      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset
      // console.log('actualX', actualX)
      // console.log('actualY', actualY)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      const userImage = new Image()
      userImage.crossOrigin = 'anonymous'
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      )

      const base64 = canvas.toDataURL()
      const base64Data = base64.split(',')[1]
      const blob = base64ToBlob(base64Data, 'image/png')
      const file = new File([blob], 'filename.png', { type: 'image/png' })
      await startUpload([file], { configureId: configurationId })
    } catch (e) {
      toast({
        title: 'Something went wrong',
        description:
          'There was a problem saving your config, please try again.',
        variant: 'destructive',
      })
    }
  }

  const base64ToBlob = (base64: string, type: string) => {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type })
  }

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3  mt-20  ">
      <div
        ref={containerRef}
        className=" h-[37.5rem] overflow-hidden col-span-2 w-full flex justify-center items-center max-w-4xl rounded-lg border-2 border-dashed border-gray-300 min-w-80 ">
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896 / 1831]">
          <AspectRatio
            ratio={896 / 1831}
            ref={phonecaseRef}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
            <NextImage
              src="/phone-template.png"
              alt="Design configurator"
              fill
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>

          <div className=" absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_9999px_rgba(229,231,235,0.6)] " />
          <div
            className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 200,
            width: imageDimensions.width / 4,
            height: imageDimensions.height / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimensions({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            })
            setRenderedPosition({ x, y })
          }}
          onDragStop={(_, { x, y }) => {
            setRenderedPosition({ x, y })
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}>
          <div className="relative w-full h-full">
            <NextImage
              fill
              src={imageUrl}
              alt="your image"
              className=" pointer-events-none w-32 h-32 "
            />
          </div>
        </Rnd>
      </div>
      <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col ">
        <ScrollArea className=" relative flex-1 overflow-auto">
          {/* <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          /> */}
          <div className="p-8">
            <h2 className=" tracking-tight font-bold text-3xl">
              Customize your case
            </h2>
            <div className="w-full h-px bg-zinc-300 my-6" />
            <div className=" relative flex flex-col gap-6 justify-between">
              <RadioGroup
                value={options.color}
                onChange={(val) => {
                  setOptions((prev) => ({
                    ...prev,
                    color: val,
                  }))
                }}>
                <Label>Color: {options.color.value}</Label>
                <div className="mt-3 flex items-center space-x-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={({ focus, checked }) =>
                        cn(
                          'relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:ring-0 focus:outline-none border-2 border-transparent',
                          {
                            [`border-${color.tw}`]: focus || checked,
                          }
                        )
                      }>
                      <span
                        className={cn(
                          `bg-${color.tw}`,
                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                        )}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              <div className="w-full relative flex flex-col gap-3">
                <Label>Model</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between">
                      {options.model.label}
                      <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.label}
                        className={cn(
                          'flex text-sm gap-1 items-center  hover:bg-zinc-100'
                        )}
                        onClick={() => {
                          setOptions((prev) => ({
                            ...prev,
                            model,
                          }))
                        }}>
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            model.label === options.model.label
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {[MATERIALS, FINISHES].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={options[name]}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        [name]: val,
                      }))
                    }}>
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className=" mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <Radio
                          key={option.value}
                          value={option}
                          className={({ focus, checked }) =>
                            cn(
                              'relative block cursor-pointer rounded-lg  p-4 shadow-sm border-2 border-zinc-200 outline-none sm:flex sm:justify-between',
                              {
                                'border-primary': focus || checked,
                              }
                            )
                          }>
                          <span className="flex flex-col text-sm">
                            <HeadlessuiLabel>{option.label}</HeadlessuiLabel>
                            {option.description && (
                              <Description as="span" className="text-gray-500">
                                <span className="block sm:inline">
                                  {option.description}
                                </span>
                              </Description>
                            )}
                          </span>
                          <Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                            <span className="block sm:inline">
                              {formatPrice(option.price / 100)}
                            </span>
                          </Description>
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                )
              )}
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16">
          <div className="w-full h-px bg-zinc-300" />
          <div className=" flex justify-between items-center h-full gap-6">
            <p className="text-sm">
              {formatPrice(
                (BASE_PRICE + options.material.price + options.finish.price) /
                  100
              )}
            </p>
            <Button
              isLoading={isPending}
              disabled={isPending}
              loadingText="Saving"
              size="sm"
              className="w-full"
              onClick={() =>
                saveConfig({
                  color: options.color.value,
                  finish: options.finish.value,
                  material: options.material.value,
                  model: options.model.value,
                  configureId: configurationId,
                })
              }>
              Continue
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator
