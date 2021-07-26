import { useEffect } from 'react';
import { Currency } from '@money-bunny/models';
import { expensesApiService } from './services/expenses-api.service';
import {
  useApplicationDispatch,
  useApplicationState,
} from './state/application-state.context';
import AppLayoutComponent from './components/app-layout/app-layout.component';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ExpensesPage from './pages/expenses.page';
import StatisticsPage from './pages/statistics.page';

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
    <BrowserRouter>
      <AppLayoutComponent>
        <Switch>
          <Route path={'/expenses'}>
            <ExpensesPage />
          </Route>
          <Route path={'/statistics'}>
            <StatisticsPage />
          </Route>
          <Route path={'/'}>
            <Redirect to={'/expenses'} />
          </Route>
        </Switch>
      </AppLayoutComponent>
    </BrowserRouter>
  );
}

export default App;
