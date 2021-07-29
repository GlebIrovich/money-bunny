import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { ApplicationStateProvider } from '../../state/application-state.context';
import ExpensesContainerComponent from './expenses-container.component';
import { expensesApiService } from '../../services/expenses-api.service';
import { Currency, ExpenseDto } from '@money-bunny/models';

const expense: ExpenseDto = {
  id: 'MyExpense',
  amount: 10,
  recipient: 'MyRecipient',
  category: 'MyCategory',
  currency: Currency.CHF,
  createdAt: '2020-07-27T17:59:31.812Z',
  updatedAt: '2020-07-27T17:59:31.812Z',
};

const updatedExpense: ExpenseDto = {
  ...expense,
  category: 'MyUpdatedCategory',
};

describe('ExpensesContainerComponent', () => {
  const getListMock = jest
    .spyOn(expensesApiService, 'getList')
    .mockResolvedValue({ data: [expense], hasErrors: false });

  const createExpense = jest
    .spyOn(expensesApiService, 'create')
    .mockResolvedValue({ data: expense, hasErrors: false });

  const updateExpense = jest
    .spyOn(expensesApiService, 'update')
    .mockResolvedValue({ data: updatedExpense, hasErrors: false });

  const deleteExpense = jest
    .spyOn(expensesApiService, 'delete')
    .mockResolvedValue({ data: { id: expense.id }, hasErrors: false });

  beforeEach(() => {
    getListMock.mockClear();
    createExpense.mockClear();
    updateExpense.mockClear();
    deleteExpense.mockClear();
  });

  it('should render correctly without expenses', () => {
    const { getByText } = render(
      <ApplicationStateProvider>
        <ExpensesContainerComponent />
      </ApplicationStateProvider>
    );

    expect(getByText("You don't have any expenses")).toBeDefined();
  });

  it('should add an item, update item, remove item', async () => {
    jest.spyOn(console, 'error').mockReturnValue();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <ApplicationStateProvider>
        <ExpensesContainerComponent />
      </ApplicationStateProvider>
    );

    const saveButton = () => getByText('Save').closest('button');

    // Create

    expect(getByText('Add')).toBeDefined();
    getByText('Add').click();
    expect(getByText('Add expense')).toBeDefined();
    expect(saveButton()?.disabled).toBeTruthy();
    getByPlaceholderText('Category');
    fireEvent.change(getByPlaceholderText('Category'), {
      target: { value: expense.category },
    });
    expect(saveButton()?.disabled).toBeFalsy();
    saveButton()?.click();

    await waitForElementToBeRemoved(() => getByText('Add expense'));

    expect(createExpense).toHaveBeenCalledWith({
      amount: 0,
      category: expense.category,
      currency: Currency.CHF,
      recipient: '',
    });

    expect(await queryByText(expense.category)).toBeDefined();

    // Update

    getByText(expense.category).click();
    getByText('Edit').closest('button')?.click();
    fireEvent.change(getByPlaceholderText('Category'), {
      target: { value: updatedExpense.category },
    });
    saveButton()?.click();

    await waitForElementToBeRemoved(() => getByText('Add expense'));

    expect(updateExpense).toHaveBeenCalledWith(expense.id, updatedExpense);

    expect(await queryByText(updatedExpense.category)).toBeDefined();

    // Delete

    getByText(updatedExpense.category).click();
    getByText('Delete').closest('button')?.click();
    expect(deleteExpense).toHaveBeenCalledWith(expense.id);

    await waitForElementToBeRemoved(() => getByText(updatedExpense.category));
  });
});
