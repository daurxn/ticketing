import type { Message } from 'node-nats-streaming'
import { Subjects, Listener, type TicketUpdatedEvent } from '@dxtickets/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'


export class TicketCreatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
  queueGroupName = queueGroupName
  
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const ticket = Ticket.build({
      id,
      title,
      price
    })
    await ticket.save()
    
    msg.ack()
  }
}
