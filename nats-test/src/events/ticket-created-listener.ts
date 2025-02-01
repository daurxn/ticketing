import type { Message } from 'node-nats-streaming'
import { Listener } from './base-listener.ts'
import type { TicketCreatedEvent } from './ticket-created-event.ts'
import { Subjects } from './subjects.ts'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    console.log(data.id)
    console.log(data.title  )
    console.log(data.price)

    msg.ack()
  }
}
