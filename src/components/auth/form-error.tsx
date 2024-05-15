import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null
  return (
    <div className=" bg-destructive/15 p-3 rounded-md flex items-center text-sm text-destructive gap-x-2">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
