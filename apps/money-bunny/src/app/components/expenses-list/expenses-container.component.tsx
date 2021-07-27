import React from 'react';
import ExpensesListComponent from './expenses-list.component';
import { useApplicationState } from '../../state/application-state.context';

const ExpensesContainerComponent = () => {
  const { expenses } = useApplicationState();

  return <ExpensesListComponent expenses={expenses} />;
};

export default ExpensesContainerComponent;
