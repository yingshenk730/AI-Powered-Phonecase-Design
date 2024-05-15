import { cn } from '@/lib/utils'

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'size-full mx-auto max-w-screen-xl px-2.5 md:px-20',
        className
      )}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper
