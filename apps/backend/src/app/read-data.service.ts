import {
  CreateExpenseDto,
  ExpenseDto,
  UpdateExpenseDto,
} from '@money-bunny/models';
import { ItemNotFoundError } from './item-not-found.error';
import { v4 as uuidV4 } from 'uuid';

export const expensesDB: Map<string, ExpenseDto> = new Map();

export function getExpenses(): ExpenseDto[] {
  return Array.from(expensesDB.values());
}

export function updateExpense(
  expenseId: string,
  expense: UpdateExpenseDto
): ExpenseDto {
  const existingExpense = expensesDB.get(expenseId);

  if (!existingExpense) {
    throw new ItemNotFoundError(expenseId);
  }

  const updatedExpense: ExpenseDto = {
    ...existingExpense,
    ...expense,
    updatedAt: new Date().toISOString(),
  };
  expensesDB.set(expenseId, updatedExpense);

  return updatedExpense;
}

export function createExpense(expense: CreateExpenseDto): ExpenseDto {
  const now = new Date().toISOString();

  const newExpense: ExpenseDto = {
    ...expense,
    id: uuidV4(),
    createdAt: now,
    updatedAt: now,
  };

  expensesDB.set(newExpense.id, newExpense);
  return newExpense;
}
