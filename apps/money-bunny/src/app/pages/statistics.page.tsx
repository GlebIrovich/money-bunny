import React from 'react';
import PageLayoutComponent from '../components/page-layout/page-layout.component';
import PageTitleLayoutComponent from '../components/page-layout/page-title-layout.component';
import PageContentLayoutComponent from '../components/page-layout/page-content-layout.component';

const StatisticsPage = () => {
  return (
    <PageLayoutComponent>
      <PageTitleLayoutComponent>Statistics</PageTitleLayoutComponent>
      <PageContentLayoutComponent>My content</PageContentLayoutComponent>
    </PageLayoutComponent>
  );
};

export default StatisticsPage;
