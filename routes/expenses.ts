import { Hono } from 'hono';
import { z } from 'zod';

export const expensesRoute = new Hono();

type Expense = {
    id: number,
    title: string,
    amount: number
};

// dummy data
const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 50 },
    { id: 2, title: "Utilities", amount: 100 },
    { id: 3, title: "Rent", amount: 1000 }
];

// for validating if retrieved data is the correct data type
const createPostSchema = z.object({
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
});

// get data
expensesRoute.get("/", (c) => {
    return c.json({ expenses: fakeExpenses});
});

// output the info somewhere
expensesRoute.post("/", async (c) => {
    const data = await c.req.json();
    const expense = createPostSchema.parse(data); // check data type
    console.log({expense}); // to see output
    return c.json(expense);
});