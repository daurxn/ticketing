import { type OrderCreatedEvent, Publisher, Subjects } from '@dxtickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}

