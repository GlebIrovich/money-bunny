import React from 'react';
import PageLayoutComponent from '../components/page-layout/page-layout.component';
import PageTitleLayoutComponent from '../components/page-layout/page-title-layout.component';
import PageContentLayoutComponent from '../components/page-layout/page-content-layout.component';

const ExpensesPage = () => {
  return (
    <PageLayoutComponent>
      <PageTitleLayoutComponent>Expenses</PageTitleLayoutComponent>
      <PageContentLayoutComponent>My content</PageContentLayoutComponent>
    </PageLayoutComponent>
  );
};

export default ExpensesPage;
