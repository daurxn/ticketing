import nats from 'node-nats-streaming'
import { TicketCreatePublisher } from './events/ticket-create-publisher.ts'

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
})

stan.on('connect', async () => {
  console.log('Publisher connected to NATS')

  const publisher = new TicketCreatePublisher(stan)

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20
    })
  } catch (err: any) {
    console.error(err)
  }
})
