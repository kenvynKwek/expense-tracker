import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())

app.get("/test", c => {
    return c.text("test page")
})

export default app // for Cloudflare Workers or Bun