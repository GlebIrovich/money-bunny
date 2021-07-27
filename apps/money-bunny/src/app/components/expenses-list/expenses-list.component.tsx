import React, { FC, useMemo, useState } from 'react';
import { Currency, ExpenseDto } from '@money-bunny/models';
import { displayCurrencyHelper } from '../../helpers/display-currency.helper';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { sortExpensesBy } from '../../helpers/sort-expenses-by.helper';

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('ch-DE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface HeadCell {
  id: keyof ExpenseDto;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'category', label: 'Category' },
  { id: 'recipient', label: 'Recipient' },
  { id: 'amount', label: 'Amount' },
  { id: 'currency', label: 'Currency' },
  { id: 'createdAt', label: 'Date' },
];

interface Props {
  expenses: ExpenseDto[];
}

const ExpensesListComponent: FC<Props> = ({ expenses }) => {
  const [sortField, setSortField] = useState<keyof ExpenseDto | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>();
  const [selectedExpenseId, setSelectedExpenseId] = useState<
    string | undefined
  >();

  const handleSortingClick = (field: keyof ExpenseDto) => () => {
    const isSameSortField = field === sortField;
    if (isSameSortField) {
      return setOrder(order === 'asc' ? 'desc' : 'asc');
    }

    setSortField(field);
    setOrder('asc');
  };

  const handleExpenseSelect = (expenseId: string) => () => {
    setSelectedExpenseId(
      expenseId === selectedExpenseId ? undefined : expenseId
    );
  };

  const displayedExpenses = useMemo(() => {
    if (sortField && order) {
      return [...expenses].sort(sortExpensesBy(sortField, order));
    }
    return expenses;
  }, [expenses, order, sortField]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((cell) => (
              <TableCell key={cell.id} sortDirection={'asc'}>
                <TableSortLabel
                  active={cell.id === sortField}
                  direction={order}
                  onClick={handleSortingClick(cell.id)}
                >
                  {cell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedExpenses.map((expense) => (
            <TableRow
              key={expense.id}
              selected={selectedExpenseId === expense.id}
              onClick={handleExpenseSelect(expense.id)}
            >
              <TableCell component="th" scope="row">
                {expense.category}
              </TableCell>
              <TableCell>{expense.recipient}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{displayCurrencyHelper(expense.currency)}</TableCell>
              <TableCell>{formatDate(expense.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesListComponent;
