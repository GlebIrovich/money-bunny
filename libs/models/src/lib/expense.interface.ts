import { Currency } from './currency.enum';

export interface ExpenseDto {
  id: string;
  recipient?: string;
  currency: Currency;
  amount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateExpenseDto = Partial<ExpenseDto>;

export interface CreateExpenseDto {
  recipient?: string;
  currency: Currency;
  amount: number;
  category: string;
}
