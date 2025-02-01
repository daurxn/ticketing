import {
  Subjects,
  Publisher,
  type OrderCancelledEvent
} from '@dxtickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}