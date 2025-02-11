import express from 'express'
import type { Request, Response } from 'express'
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth
} from '@dxtickets/common'
import { Order } from '../models/order'

const router = express.Router()

router.get('/api/orders/:orderId', async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket')
  
  if (!order) {
    throw new NotFoundError()
  }
  
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }
  
  res.send(order)
})

export { router as showOrderRouter }