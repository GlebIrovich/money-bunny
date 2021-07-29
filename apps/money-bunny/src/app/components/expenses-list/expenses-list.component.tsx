import React, { FC, useMemo, useState } from 'react';
import { Currency, ExpenseDto } from '@money-bunny/models';
import { displayCurrencyHelper } from '../../helpers/display-currency.helper';
import {
  Button,
  ClickAwayListener,
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
import ActionBarComponent from './action-bar.component';
import styled from 'styled-components';
import { filterExpenses } from '../../helpers/filter-expenses.helper';

const StyledButton = styled(Button)`
  margin-left: 10px !important;
`;

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
  onDelete: (id: string) => void;
  onEdit: () => void;
  onAdd: () => void;

  selectedExpenseId: string | undefined;
  setSelectedExpenseId: (id: string | undefined) => void;
}

const ExpensesListComponent: FC<Props> = ({
  expenses,
  onDelete,
  onEdit,
  onAdd,
  setSelectedExpenseId,
  selectedExpenseId,
}) => {
  const [sortField, setSortField] = useState<keyof ExpenseDto | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>();
  const [searchTerm, search] = useState<string>('');

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

  const handleDelete = () => {
    if (selectedExpenseId) {
      onDelete(selectedExpenseId);
      setSelectedExpenseId(undefined);
    }
  };

  const displayedExpenses = useMemo(() => {
    const filteredExpenses = [...expenses].filter(filterExpenses(searchTerm));
    if (sortField && order) {
      return filteredExpenses.sort(sortExpensesBy(sortField, order));
    }
    return filteredExpenses;
  }, [expenses, order, sortField, searchTerm]);

  return (
    <ClickAwayListener onClickAway={() => setSelectedExpenseId(undefined)}>
      <div>
        <ActionBarComponent searchTerm={searchTerm} onSearch={search}>
          {selectedExpenseId ? (
            <>
              <StyledButton
                size={'medium'}
                color={'default'}
                variant={'outlined'}
                onClick={onEdit}
              >
                Edit
              </StyledButton>
              <StyledButton
                size={'medium'}
                color={'secondary'}
                variant={'outlined'}
                onClick={handleDelete}
              >
                Delete
              </StyledButton>
            </>
          ) : (
            <StyledButton
              size={'medium'}
              color={'primary'}
              variant={'outlined'}
              onClick={onAdd}
            >
              Add
            </StyledButton>
          )}
        </ActionBarComponent>

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
                  <TableCell>
                    {displayCurrencyHelper(expense.currency)}
                  </TableCell>
                  <TableCell>{formatDate(expense.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ClickAwayListener>
  );
};

export default ExpensesListComponent;
