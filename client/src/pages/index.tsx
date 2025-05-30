import { NextPageContext } from 'next'
import { Ticket } from '@/lib/types'
import buildClient from '@/api/build-client'
import Link from 'next/link'

interface LandingPageProps {
  tickets: Ticket[]
}

// test

const LandingPage = ({ tickets }: LandingPageProps) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href={`/tickets/${ticket.id}`}>View</Link>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  )
}

LandingPage.getInitialProps = async (context: NextPageContext) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/tickets')

  return { tickets: data }
}

export default LandingPage
