import React, { useCallback, useMemo, useState } from 'react';
import ExpensesListComponent from './expenses-list.component';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../../state/application-state.context';
import { expensesApiService } from '../../services/expenses-api.service';
import DialogComponent, { ExpenseFormState } from './dialog.component';
import { CreateExpenseDto, UpdateExpenseDto } from '@money-bunny/models';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const ExpensesContainerComponent = () => {
  const [selectedExpenseId, setSelectedExpenseId] = useState<
    string | undefined
  >();
  const [open, setOpen] = React.useState(false);
  const { expenses } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const deleteExpense = useCallback(
    (expenseId: string) => {
      expensesApiService.delete(expenseId).then((results) => {
        if (results.data) {
          dispatch({
            type: 'REMOVE_EXPENSE',
            expenseId,
          });
        }
      });
    },
    [dispatch]
  );

  const save = (expense: ExpenseFormState) => {
    return selectedExpenseId
      ? updateExpense(selectedExpenseId, expense)
      : createExpense(expense);
  };

  const createExpense = useCallback(
    (expense: CreateExpenseDto) => {
      expensesApiService.create(expense).then((result) => {
        if (result.data) {
          dispatch({
            type: 'ADD_EXPENSE',
            expense: result.data,
          });

          closeDialog();
        }
      });
    },
    [dispatch]
  );

  const updateExpense = useCallback(
    (expenseId: string, expense: UpdateExpenseDto) => {
      if (expense.id) {
        expensesApiService.update(expense.id, expense).then((result) => {
          if (result.data) {
            dispatch({
              type: 'UPDATE_EXPENSE',
              expense: result.data,
            });

            closeDialog();
          }
        });
      }
    },
    [dispatch]
  );

  const selectedExpense = useMemo(
    () => expenses.find((expense) => expense.id === selectedExpenseId),
    [selectedExpenseId, expenses]
  );

  return (
    <>
      <ExpensesListComponent
        onDelete={deleteExpense}
        expenses={expenses}
        onAdd={openDialog}
        onEdit={openDialog}
        selectedExpenseId={selectedExpenseId}
        setSelectedExpenseId={setSelectedExpenseId}
      />
      {expenses.length === 0 && (
        <EmptyState>
          <Typography variant={'h6'}>You don't have any expenses</Typography>
        </EmptyState>
      )}
      <DialogComponent
        expense={selectedExpense}
        isOpen={open}
        close={closeDialog}
        onSave={save}
      />
    </>
  );
};

export default ExpensesContainerComponent;
