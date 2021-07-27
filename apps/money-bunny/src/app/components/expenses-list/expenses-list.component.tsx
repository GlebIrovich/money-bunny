import { DataGrid, GridColDef } from '@material-ui/data-grid';
import React, { FC } from 'react';
import { Currency, ExpenseDto } from '@money-bunny/models';
import styled from 'styled-components';
import { displayCurrencyHelper } from '../../helpers/display-currency.helper';

const StyledGrid = styled(DataGrid)`
  min-height: 400px;
`;

const columns: GridColDef[] = [
  {
    field: 'id',
    hide: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true,
  },
  {
    field: 'recipient',
    headerName: 'Recipient',
    minWidth: 150,
    flex: 150,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    type: 'number',
    editable: true,
  },
  {
    field: 'currency',
    headerName: 'Currency',
    valueFormatter: (params) => displayCurrencyHelper(params.value as Currency),
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    type: 'dateTime',
    valueFormatter: (params) => formatDate(params.value as string),
    width: 180,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString('ch-DE', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface Props {
  expenses: ExpenseDto[];
}

const ExpensesListComponent: FC<Props> = ({ expenses }) => {
  return (
    <StyledGrid
      rows={expenses}
      columns={columns}
      pageSize={10}
      disableColumnMenu
      disableMultipleColumnsFiltering
      disableMultipleColumnsSorting
      disableMultipleSelection
    />
  );
};

export default ExpensesListComponent;
