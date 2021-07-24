import { Currency, ExpenseDto } from '@money-bunny/models';
import { v4 as uuidV4 } from 'uuid';
import {
  Action,
  ApplicationState,
  stateReducer,
  useApplicationDispatch,
  useApplicationState,
} from './application-state.context';
import { render } from '@testing-library/react';

function createExpense(): ExpenseDto {
  return {
    id: uuidV4(),
    amount: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    category: 'category',
    currency: Currency.CHF,
  };
}

describe('stateReducer', () => {
  it('ADD_EXPENSES', () => {
    const initialState: ApplicationState = {
      expenses: [],
    };

    const expenses = [createExpense(), createExpense()];

    const action: Action = {
      expenses,
      type: 'ADD_EXPENSES',
    };

    expect(stateReducer(initialState, action)).toEqual({ expenses });
  });

  it('ADD_EXPENSE', () => {
    const initialState: ApplicationState = {
      expenses: [],
    };

    const expense = createExpense();

    const action: Action = {
      expense,
      type: 'ADD_EXPENSE',
    };

    expect(stateReducer(initialState, action)).toEqual({ expenses: [expense] });
  });

  it('UPDATE_EXPENSE', () => {
    const expense = createExpense();
    const initialState: ApplicationState = {
      expenses: [expense],
    };

    const updatedExpense = { ...expense, amount: 500 };

    const action: Action = {
      expense: updatedExpense,
      type: 'UPDATE_EXPENSE',
    };

    expect(stateReducer(initialState, action)).toEqual({
      expenses: [updatedExpense],
    });
  });

  it('REMOVE_EXPENSE', () => {
    const expense = createExpense();
    const initialState: ApplicationState = {
      expenses: [expense],
    };

    const action: Action = {
      expenseId: expense.id,
      type: 'REMOVE_EXPENSE',
    };

    expect(stateReducer(initialState, action)).toEqual({
      expenses: [],
    });
  });
});

describe('useApplicationState', () => {
  jest.spyOn(console, 'error').mockReturnValue();
  const Component = () => {
    useApplicationState();
    return null;
  };

  it('should throw if used outside of the context', () => {
    expect(() => render(<Component />)).toThrowError();
  });
});

describe('useApplicationDispatch', () => {
  jest.spyOn(console, 'error').mockReturnValue();
  const Component = () => {
    useApplicationDispatch();
    return null;
  };

  it('should throw if used outside of the context', () => {
    expect(() => render(<Component />)).toThrowError();
  });
});
