import { useEffect } from 'react';
import { expensesApiService } from './services/expenses-api.service';
import { useApplicationDispatch } from './state/application-state.context';
import AppLayoutComponent from './components/app-layout/app-layout.component';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ExpensesPage from './pages/expenses.page';
import StatisticsPage from './pages/statistics.page';

export function App() {
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
