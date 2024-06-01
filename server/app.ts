import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoute } from './routes/expenses'

const app = new Hono();

app.use(logger());

app.get("/test", c => {
    return c.text("test page")
});

app.route("/api/expenses", expensesRoute); // routes localhost:3000/api/expenses to expensesRoute (/routes/expenses.ts)

export default app; // for Cloudflare Workers or Bun