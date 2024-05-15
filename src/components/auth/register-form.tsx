'use client'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { CardWrapper } from './card-wrapper'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button, buttonVariants } from '../ui/button'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { FormError } from './form-error'
import { FormSuccess } from './form-success'
import { Eye, EyeOff } from 'lucide-react'
import { register } from '@/actions/register'
import { useRouter } from 'next/navigation'

export const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })
  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')
    startTransition(async () => {
      const res = await register(data)
      if (res?.error) setError(res?.error)
      if (res?.success) {
        setSuccess(res?.success)
        setTimeout(() => {
          router.push('/auth/login')
        }, 1000)
      }
    })
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <CardWrapper
      header="Create an account"
      backBtnLabel="Already have an account? Login here."
      backBtnHref="/auth/login"
      showSocials>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="xxx@gamil.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="******"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className=" relative">
                      <Input
                        disabled={isPending}
                        placeholder="******"
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <div className=" absolute  top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                        {showPassword ? (
                          <Eye
                            className="h-5 w-5"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <EyeOff
                            className="h-5 w-5"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
