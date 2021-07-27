import { Currency, ExpenseDto } from '@money-bunny/models';
import { filterExpenses } from './filter-expenses.helper';

describe('filterExpenses', () => {
  const expense: ExpenseDto = {
    id: 'A',
    amount: 10,
    recipient: 'recipient',
    category: 'category',
    currency: Currency.CHF,
    createdAt: '2020-07-27T17:59:31.812Z',
    updatedAt: '2020-07-27T17:59:31.812Z',
  };

  it('should correctly filter', () => {
    expect(filterExpenses('recipient')(expense)).toEqual(true);
    expect(filterExpenses('category')(expense)).toEqual(true);
    expect(filterExpenses('10')(expense)).toEqual(true);

    expect(filterExpenses('random')(expense)).toEqual(false);
  });
});
