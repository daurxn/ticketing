import { Publisher, Subjects, TicketUpdatedEvent } from '@dxtickets/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}