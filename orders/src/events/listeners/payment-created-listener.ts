import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus
} from '@dxtickets/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'
import { queueGroupName } from './queue-group-name'

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
  queueGroupName = queueGroupName
  
  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId)
    
    if (!order) {
      throw new Error('Order not found')
    }
    
    order.set({ status: OrderStatus.Complete })
    await order.save()
    
    msg.ack()
  }
}
