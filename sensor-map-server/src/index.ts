import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Middleware
app.use('/*', cors())

// Routes
app.get('/', (c) => {
  return c.json({ message: 'Sensor Map API' })
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

// Start server
const port = 3000
console.log(`Server is running on http://localhost:${port}`)

export default app
