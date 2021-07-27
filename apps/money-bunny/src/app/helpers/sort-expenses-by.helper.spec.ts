import { Currency, ExpenseDto } from '@money-bunny/models';
import { sortExpensesBy } from './sort-expenses-by.helper';

describe('sortExpensesByHelper', () => {
  const expenseA: ExpenseDto = {
    id: 'A',
    amount: 1,
    recipient: 'A',
    category: 'A',
    currency: Currency.CHF,
    createdAt: '2020-07-27T17:59:31.812Z',
    updatedAt: '2020-07-27T17:59:31.812Z',
  };

  const expenseB: ExpenseDto = {
    id: 'B',
    amount: 2,
    recipient: 'B',
    category: 'B',
    currency: Currency.RUB,
    createdAt: '2022-07-27T17:59:31.812Z',
    updatedAt: '2022-07-27T17:59:31.812Z',
  };

  const expenseC: ExpenseDto = {
    id: 'C',
    amount: 3,
    recipient: 'C',
    category: 'C',
    currency: Currency.USD,
    createdAt: '2025-07-27T17:59:31.812Z',
    updatedAt: '2025-07-27T17:59:31.812Z',
  };

  const expenses = (): ExpenseDto[] => [expenseA, expenseB, expenseC];

  it('should sort in ASC order', () => {
    const expected = [expenseA, expenseB, expenseC];

    Object.keys(expenseA).forEach((key) => {
      expect(
        expenses().sort(sortExpensesBy(key as keyof ExpenseDto, 'asc'))
      ).toEqual(expected);
    });
  });

  it('should sort in DESC order', () => {
    const expected = [expenseC, expenseB, expenseA];

    Object.keys(expenseA).forEach((key) => {
      expect(
        expenses().sort(sortExpensesBy(key as keyof ExpenseDto, 'desc'))
      ).toEqual(expected);
    });
  });
});
