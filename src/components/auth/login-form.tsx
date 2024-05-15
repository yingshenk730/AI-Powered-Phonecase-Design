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
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button, buttonVariants } from '../ui/button'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { FormError } from './form-error'
import { login } from '@/actions/login'

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setError('')
    startTransition(async () => {
      const res = await login(data)
      if (res?.error) setError(res?.error)
    })
  }

  return (
    <CardWrapper
      header="Welcome back!"
      backBtnLabel="Don't have an account? Sign up"
      backBtnHref="/auth/register"
      showSocials>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="******"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              className={buttonVariants({
                variant: 'link',
                size: 'sm',
                className: 'text-zinc-500 hover:text-primary py-0',
              })}
              href="/auth/reset">
              Forgot password?
            </Link>

            {/* <FormError message={urlError} /> */}
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
