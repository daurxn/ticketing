import { NextPageContext } from 'next'
import buildClient from '@/api/build-client'
import { Order } from '@/lib/types'

interface OrderIndexProps {
  orders: Order[]
}

export default function OrderIndex({ orders }: OrderIndexProps) {
  return (
    <ul>
      {orders.map((order) => {
        return (
          <li key={order.id}>
            {order.ticket.title} - {order.status}
          </li>
        )
      })}
    </ul>
  )
}

OrderIndex.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context)

  const { data } = await client.get('/api/orders')

  return { orders: data }
}
