import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun'

const app = new Hono();

app.use(logger());

app.route("/api/expenses", expensesRoute); // routes localhost:3000/api/expenses to expensesRoute (/routes/expenses.ts)

app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app; // for Cloudflare Workers or Bun