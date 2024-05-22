import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

export const expensesRoute = new Hono();

// use zod instead of writing new typescript object
const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
});

type Expense = z.infer<typeof expenseSchema>;

// createPostSchema is expenseSchema but without id
const createPostSchema = expenseSchema.omit({ id: true });

// dummy data
const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 50 },
    { id: 2, title: "Utilities", amount: 100 },
    { id: 3, title: "Rent", amount: 1000 }
];

// get data
expensesRoute.get("/", (c) => {
    return c.json({ expenses: fakeExpenses});
});

// output the info somewhere
expensesRoute.post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({...expense, id: fakeExpenses.length + 1})
    c.status(201);
    return c.json(expense);
});

// output expense based on id in URL eg. api/expense/1
// by default, whatever is after expense/ is a string, use regex to check its a number before parseInt
expensesRoute.get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const expense = fakeExpenses.find(expense => expense.id === id);
    if (!expense) {
        return c.notFound();
    }
    return c.json(expense);
});

expensesRoute.delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeExpenses.findIndex(expense => expense.id === id);
    if (index === -1) {
        return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
});