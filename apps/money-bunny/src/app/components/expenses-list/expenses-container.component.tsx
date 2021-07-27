import React, { useCallback } from 'react';
import ExpensesListComponent from './expenses-list.component';
import {
  useApplicationDispatch,
  useApplicationState,
} from '../../state/application-state.context';
import { expensesApiService } from '../../services/expenses-api.service';

const ExpensesContainerComponent = () => {
  const { expenses } = useApplicationState();
  const dispatch = useApplicationDispatch();

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

  return <ExpensesListComponent onDelete={deleteExpense} expenses={expenses} />;
};

export default ExpensesContainerComponent;
