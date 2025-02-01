export interface User {
  email: string
  id: string
}

export interface Ticket {
  id: string
  title: string
  price: number
}

export interface Order {
  id: string
  userId: string
  status: string
  expiresAt: string
  ticket: {
    title: string
    price: number
    version: number
    id: string
  }
  version: number
}
