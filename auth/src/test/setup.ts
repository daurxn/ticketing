import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  function signup(): Promise<string>
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfsfsf'
  
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()
  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db?.collections() || []
  
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signup = async function() {
  const email = 'test@test.com'
  const password = 'password'
  
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201)
  
  return response.get('Set-Cookie')?.[0] ?? ''
}