import {
  CreateExpenseDto,
  ExpenseDto,
  UpdateExpenseDto,
} from '@money-bunny/models';

const BASE_API_URL = '/api/expenses';

function endpointUrl(): string {
  // Here we can use different url for production.
  return `http://localhost:3333${BASE_API_URL}`;
}

export interface ApiServiceResponse<T> {
  data: T | null;
  hasErrors: boolean;
}

export async function parseResponseData<T>(
  response: Response
): Promise<ApiServiceResponse<T>> {
  const result: ApiServiceResponse<T> = {
    data: null,
    hasErrors: false,
  };

  if (!response.ok) {
    result.hasErrors = true;
    return result;
  }

  try {
    result.data = (await response.json()) as T;

    return result;
  } catch {
    result.hasErrors = true;
    return result;
  }
}

export const expensesApiService = {
  getList: (): Promise<ApiServiceResponse<ExpenseDto[]>> =>
    fetch(endpointUrl()).then((response) =>
      parseResponseData<ExpenseDto[]>(response)
    ),

  create: (item: CreateExpenseDto): Promise<ApiServiceResponse<ExpenseDto>> =>
    fetch(endpointUrl(), {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(item),
    }).then((response) => parseResponseData<ExpenseDto>(response)),

  update: (
    id: string,
    item: UpdateExpenseDto
  ): Promise<ApiServiceResponse<ExpenseDto>> =>
    fetch(`${endpointUrl()}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(item),
    }).then((response) => parseResponseData<ExpenseDto>(response)),

  delete: (id: string): Promise<ApiServiceResponse<{ id: string }>> =>
    fetch(`${endpointUrl()}/${id}`, {
      method: 'DELETE',
    }).then((response) => parseResponseData<{ id: string }>(response)),
};
