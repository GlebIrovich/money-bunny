import React, { useEffect } from 'react';
import PageLayoutComponent from '../components/page-layout/page-layout.component';
import PageTitleLayoutComponent from '../components/page-layout/page-title-layout.component';
import PageContentLayoutComponent from '../components/page-layout/page-content-layout.component';
import { useApplicationDispatch } from '../state/application-state.context';
import { expensesApiService } from '../services/expenses-api.service';
import ExpensesContainerComponent from '../components/expenses-list/expenses-container.component';

const ExpensesPage = () => {
  const dispatch = useApplicationDispatch();
  useEffect(() => {
    expensesApiService.getList().then(({ data }) => {
      if (data) {
        dispatch({
          type: 'ADD_EXPENSES',
          expenses: data,
        });
      }
    });
  }, [dispatch]);

  return (
    <PageLayoutComponent>
      <PageTitleLayoutComponent>Expenses</PageTitleLayoutComponent>
      <PageContentLayoutComponent>
        <ExpensesContainerComponent />
      </PageContentLayoutComponent>
    </PageLayoutComponent>
  );
};

export default ExpensesPage;
