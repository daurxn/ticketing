import { NextPageContext } from 'next'
import buildClient from '@/api/build-client'
import { Order, User } from '@/lib/types'
import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '@/hooks/use-request'
import { error } from 'next/dist/build/output/log'
import Router from 'next/router'

interface OrderShowProps {
  order: Order
  currentUser: null | User
}

export default function OrderShow({ order, currentUser }: OrderShowProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push('/orders'),
  })

  useEffect(() => {
    function findTimeLeft() {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime()
      setTimeLeft(Math.round(msLeft / 1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return function () {
      clearInterval(timerId)
    }
  }, [])

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51QIaip2Lweimb62waW72xAF6v0drRKBOG1z0aEh3Gy6C6CLwdb663HDb1f75my3DkeFtMQbDAEpoJJfAieYMmEk400A9oAZWMk"
        amount={order.ticket.price * 100}
        email={currentUser?.email}
      />
      {errors}
    </div>
  )
}

OrderShow.getInitialProps = async (context: NextPageContext) => {
  const { orderId } = context.query
  const client = buildClient(context)
  const { data } = await client.get(`/api/orders/${orderId}`)

  return { order: data }
}
