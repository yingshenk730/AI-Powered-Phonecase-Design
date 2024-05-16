import { auth } from '@/auth'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import React from 'react'
import StatusDropdown from './StatusDropdown'

const Page = async () => {
  const session = await auth()
  // console.log('session: ', session)

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
  if (!session?.user || session?.user?.email !== ADMIN_EMAIL) {
    return notFound()
  }
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  })

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  })
  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 2500

  return (
    <MaxWidthWrapper>
      <div className=" w-full flex flex-col py-6 gap-16">
        <div className="w-full  grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Week </CardDescription>
              <CardTitle className=" text-3xl">
                {formatPrice(lastWeekSum._sum.amount ?? 0)}
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-sm text-muted-foreground">
                of {formatPrice(WEEKLY_GOAL)} goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={((lastMonthSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
              />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Month </CardDescription>
              <CardTitle className=" text-3xl">
                {formatPrice(lastMonthSum._sum.amount ?? 0)}
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="text-sm text-muted-foreground">
                of {formatPrice(MONTHLY_GOAL)} goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={((lastWeekSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
              />
            </CardFooter>
          </Card>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Incoming orders</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">
                Purchase date
              </TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="bg-accent">
                <TableCell>
                  <div className="font-medium">
                    {order.shippingAddress?.name}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {order.user.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusDropdown id={order.id} orderStatus={order.status} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {formatPrice(order.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
