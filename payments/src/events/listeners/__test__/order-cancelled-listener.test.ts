import { OrderCancelledListener } from '../order-cancelled-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { OrderCancelledEvent, OrderStatus } from '@dxtickets/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../../../models/order'
import mongoose from 'mongoose'

async function setup() {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'asdf',
    version: 0,
  })
  await order.save()

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version,
    ticket: {
      id: 'asdf',
    },
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, msg, data, order }
}

it('updates the status of the order', async () => {
  const { listener, msg, data, order } = await setup()

  await listener.onMessage(data, msg)

  const updatedOrder = await Order.findById(data.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async () => {
  const { listener, msg, data, order } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})
