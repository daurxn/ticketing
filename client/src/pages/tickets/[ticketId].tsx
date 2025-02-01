import { NextPageContext } from 'next'
import buildClient from '@/api/build-client'
import { Order, Ticket } from '@/lib/types'
import useRequest from '@/hooks/use-request'
import Router from 'next/router'

interface TicketShowProps {
  ticket: Ticket
}

export default function TicketShow({ ticket }: TicketShowProps) {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id,
    },
    onSuccess: (order: Order) => {
      Router.push(`/orders/${order.id}`)
    },
  })

  return (
    <div>
      Ticket Show
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  )
}

TicketShow.getInitialProps = async (context: NextPageContext) => {
  const { ticketId } = context.query

  const client = buildClient(context)
  const { data } = await client.get(`/api/tickets/${ticketId}`)

  return { ticket: data }
}
