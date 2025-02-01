import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
  function signin(id?: string): string
}

jest.mock('../nats-wrapper')

process.env.STRIPE_KEY =
  'sk_test_51QIaip2Lweimb62wIyFp08zppNgbNy9IfFDVbd8leAgHBAfw9G51YU70rblmNeQgPKrP3G3GOhahSIkkC8CVLPO800SaFsRWNZ'

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfsfsf'

  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = (await mongoose.connection.db?.collections()) || []

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = function (id?: string) {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id ?? new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const session = { jwt: token }
  const sessionJSON = JSON.stringify(session)
  const base64 = Buffer.from(sessionJSON).toString('base64')
  return `session=${base64}`
}
