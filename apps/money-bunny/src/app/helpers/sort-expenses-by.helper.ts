import { Currency, ExpenseDto } from '@money-bunny/models';
import { displayCurrencyHelper } from './display-currency.helper';

function stringSort(valueA: string, valueB: string) {
  return valueA.localeCompare(valueB);
}

function numericSort(valueA: number, valueB: number) {
  return valueA - valueB;
}

function dateSort(valueA: string, valueB: string) {
  return new Date(valueA).getTime() - new Date(valueB).getTime();
}

function currencySort(valueA: Currency, valueB: Currency) {
  return stringSort(
    displayCurrencyHelper(valueA),
    displayCurrencyHelper(valueB)
  );
}

export function sortExpensesBy(key: keyof ExpenseDto, order: 'asc' | 'desc') {
  const k = order === 'asc' ? 1 : -1;

  return (expenseA: ExpenseDto, expenseB: ExpenseDto): number => {
    switch (key) {
      case 'amount':
        return numericSort(expenseA[key], expenseB[key]) * k;
      case 'createdAt':
      case 'updatedAt':
        return dateSort(expenseA[key], expenseB[key]) * k;
      case 'currency':
        return currencySort(expenseA[key], expenseB[key]) * k;
      default:
        return stringSort(expenseA[key] || '', expenseB[key] || '') * k;
    }
  };
}
