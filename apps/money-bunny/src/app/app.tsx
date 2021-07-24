import { useEffect } from 'react';
import { Currency } from '@money-bunny/models';
import { expensesApiService } from './services/expenses-api.service';
import {
  useApplicationDispatch,
  useApplicationState,
} from './state/application-state.context';

export function App() {
  const state = useApplicationState();
  const dispatch = useApplicationDispatch();
  useEffect(() => {
    expensesApiService.getList().then(({ data }) => {
      if (data) {
        console.log('Request');
        dispatch({
          type: 'ADD_EXPENSES',
          expenses: data,
        });
      }
    });
  }, [dispatch]);

  const addItem = () =>
    dispatch({
      type: 'ADD_EXPENSE',
      expense: {
        id: (Math.random() * 1000).toString(),
        amount: 100,
        currency: Currency.CHF,
        category: 'any',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

  return (
    <div>
      <button onClick={addItem}>Click</button>
      {state.expenses.map((item) => (
        <div key={item.id}>{item.amount}</div>
      ))}
    </div>
  );
}

export default App;
