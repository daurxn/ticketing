import express from 'express'
import { currentUser } from '@dxtickets/common'
import type { Request, Response, NextFunction } from 'express'

const router = express.Router()

router.get('/api/users/currentuser',
  currentUser,
  (req, res) => {
    res.send({ currentUser: req.currentUser || null })
  })

export { router as currentUserRouter }