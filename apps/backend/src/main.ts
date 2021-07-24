import { app } from './app';
import { expensesDB } from './app/read-data.service';
import { v4 as uuidV4 } from 'uuid';
import { Currency, ExpenseDto } from '@money-bunny/models';

// Seed some data
function createExpense(): ExpenseDto {
  return {
    id: uuidV4(),
    amount: Math.round(Math.random() * 1000),
    category: 'food',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currency: Currency.CHF,
  };
}

Array(5)
  .fill(0)
  .forEach(() => {
    const expense = createExpense();
    expensesDB.set(expense.id, expense);
  });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
