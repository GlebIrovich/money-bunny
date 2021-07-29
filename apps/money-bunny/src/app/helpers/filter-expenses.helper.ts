import { ExpenseDto } from '@money-bunny/models';

export function filterExpenses(searchTerm: string) {
  return (expense: ExpenseDto): boolean => {
    return (
      expense.category.toLocaleLowerCase().includes(searchTerm) ||
      expense.recipient?.toLocaleLowerCase().includes(searchTerm) ||
      expense.amount.toString().includes(searchTerm)
    );
  };
}
