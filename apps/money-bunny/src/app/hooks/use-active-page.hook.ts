import { useLocation } from 'react-router-dom';

export enum ActivePage {
  EXPENSES = 'expenses',
  STATISTICS = 'statistics',
}

export function useActivePage(): ActivePage {
  const location = useLocation();

  if (location.pathname.includes(ActivePage.STATISTICS)) {
    return ActivePage.STATISTICS;
  }

  return ActivePage.EXPENSES;
}
