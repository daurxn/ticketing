import { Publisher, Subjects, TicketCreatedEvent } from '@dxtickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}