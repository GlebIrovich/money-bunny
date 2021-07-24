import { useEffect, useState } from 'react';
import { ExpenseDto } from '@money-bunny/models';
import { expensesApiService } from './services/expenses-api.service';

export function App() {
  const [items, setItems] = useState<ExpenseDto[]>([]);
  useEffect(() => {
    expensesApiService.getList().then(({ data }) => data && setItems(data));
  }, []);

  return (
    <div>
      {items.map((item) => (
        <span key={item.id}>{item.amount}</span>
      ))}
    </div>
  );
}

export default App;
