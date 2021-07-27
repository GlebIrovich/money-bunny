import React, { useCallback } from 'react';
import ExpensesListComponent from './expenses-list.component';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../../state/application-state.context';
import { ExpenseDto } from '@money-bunny/models';
import { expensesApiService } from '../../services/expenses-api.service';

const ExpensesContainerComponent = () => {
  const { expenses } = useApplicationState();
  const dispatch = useApplicationDispatch();

  const onExpenseChange = useCallback(
    (expenseId: string, expense: Partial<ExpenseDto>) => {
      expensesApiService.update(expenseId, expense).then((results) => {
        if (results.data) {
          dispatch({
            type: 'UPDATE_EXPENSE',
            expense: results.data,
          });
        }
      });
    },
    [dispatch]
  );

  return <ExpensesListComponent expenses={expenses} />;
};

export default ExpensesContainerComponent;
