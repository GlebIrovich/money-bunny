import { ExpenseDto } from '@money-bunny/models';
import React, { FC, Reducer, useContext } from 'react';

export interface ApplicationState {
  expenses: ExpenseDto[];
}

export type Action =
  | { type: 'ADD_EXPENSES'; expenses: ExpenseDto[] }
  | { type: 'ADD_EXPENSE'; expense: ExpenseDto }
  | { type: 'UPDATE_EXPENSE'; expense: ExpenseDto }
  | { type: 'REMOVE_EXPENSE'; expenseId: string };

export type Dispatch = (action: Action) => void;

const Context = React.createContext<
  { state: ApplicationState; dispatch: Dispatch } | undefined
>(undefined);

export function stateReducer(
  state: ApplicationState,
  action: Action
): ApplicationState {
  switch (action.type) {
    case 'ADD_EXPENSES':
      return { ...state, expenses: action.expenses };

    case 'ADD_EXPENSE':
      return { ...state, expenses: state.expenses.concat([action.expense]) };

    case 'UPDATE_EXPENSE': {
      const expense = state.expenses.find(
        (expense) => expense.id === action.expense.id
      );
      Object.assign(expense, action.expense);
      return { ...state, expenses: [...state.expenses] };
    }

    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.expenseId
        ),
      };

    default:
      return state;
  }
}

export const ApplicationStateProvider: FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<Reducer<ApplicationState, Action>>(
    stateReducer,
    { expenses: [] }
  );

  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useApplicationState(): ApplicationState {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useApplicationState hook must by used inside ApplicationStateProvider'
    );
  }

  return context.state;
}

export function useApplicationDispatch(): Dispatch {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      'useApplicationDispatch hook must by used inside ApplicationStateProvider'
    );
  }

  return context.dispatch;
}
