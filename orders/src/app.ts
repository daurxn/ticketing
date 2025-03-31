import express from 'express'
import mongoSanitize  from 'express-mongo-sanitize'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { currentUser, errorHandler, NotFoundError } from '@dxtickets/common'
import { createOrderRouter } from './routes/new'
import { indexOrderRouter } from './routes'
import { showOrderRouter } from './routes/show'
import { deleteOrderRouter } from './routes/delete'


const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(mongoSanitize())
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}))

app.use(currentUser)

app.use(createOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.use(indexOrderRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }