import express from 'express';
import { CreateExpenseDto, UpdateExpenseDto } from '@money-bunny/models';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from './app/read-data.service';
import { ItemNotFoundError } from './app/item-not-found.error';

export const app = express();

app.use(express.json());

app.get('/api/expenses', (req, res) => {
  res.send(getExpenses());
});

app.put('/api/expenses/:id', (req, res) => {
  const id = req.params.id as string;
  const expense = req.body as UpdateExpenseDto;
  try {
    const updatedExpense = updateExpense(id, expense);
    res.send(updatedExpense);
  } catch (error) {
    if (error instanceof ItemNotFoundError) {
      res.sendStatus(404);
    }
  }
});

app.delete('/api/expenses/:id', (req, res) => {
  const id = req.params.id as string;
  try {
    deleteExpense(id);
    res.sendStatus(200);
  } catch (error) {
    if (error instanceof ItemNotFoundError) {
      res.sendStatus(404);
    }
  }
});

app.post('/api/expenses', (req, res) => {
  const expense = req.body as CreateExpenseDto;
  const createdExpense = createExpense(expense);

  res.status(201);
  res.send(createdExpense);
});
