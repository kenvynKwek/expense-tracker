import { Hono } from 'hono'

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

// get data
expensesRoute.get("/", (c) => {
    return c.json({ expenses: fakeExpenses});
});

// output the info somewhere
expensesRoute.post("/", async (c) => {
    const expense = await c.req.json();
    console.log({expense}); // to see output
    return c.json(expense);
});