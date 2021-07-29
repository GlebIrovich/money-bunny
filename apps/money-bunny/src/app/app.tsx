import AppLayoutComponent from './components/app-layout/app-layout.component';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ExpensesPage from './pages/expenses.page';
import StatisticsPage from './pages/statistics.page';

export function App() {
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
