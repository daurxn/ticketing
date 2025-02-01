import { Publisher } from './base-publisher.ts'
import type { TicketCreatedEvent } from './ticket-created-event.ts'
import { Subjects } from './subjects.ts'

export class TicketCreatePublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
