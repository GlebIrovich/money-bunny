import { expensesDB } from './app/read-data.service';
import {
  CreateExpenseDto,
  Currency,
  ExpenseDto,
  UpdateExpenseDto,
} from '@money-bunny/models';
import request from 'supertest';
import { app } from './app';

describe('backend tests', () => {
  const expense: ExpenseDto = {
    id: '1',
    category: 'any',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currency: Currency.CHF,
    amount: 100,
  };

  beforeEach(() => {
    expensesDB.clear();
    expensesDB.set(expense.id, expense);
  });

  describe('GET route', () => {
    it('should return array of expenses', (done) => {
      request(app)
        .get('/api/expenses')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual([expense]);
          done();
        })
        .catch(done);
    });
  });

  describe('PUT route', () => {
    const update: UpdateExpenseDto = {
      category: 'NEW Category',
      currency: Currency.USD,
      amount: 200,
    };
    it('should return updated expense', (done) => {
      request(app)
        .put(`/api/expenses/${expense.id}`)
        .send(update)
        .set('Accept', 'application/json')
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchObject(update);
          expect(response.body.updatedAt).not.toEqual(expense.updatedAt);
          done();
        })
        .catch(done);
    });

    it('should return 404 if item is not found', (done) => {
      expensesDB.clear();
      request(app)
        .put(`/api/expenses/${expense.id}`)
        .send(update)
        .set('Accept', 'application/json')
        .expect(404, done);
    });
  });

  describe('DELETE route', () => {
    it('should delete expense', (done) => {
      request(app).delete(`/api/expenses/${expense.id}`).expect(200, done);
    });

    it('should return 404 if item is not found', (done) => {
      expensesDB.clear();
      request(app).delete(`/api/expenses/${expense.id}`).expect(404, done);
    });
  });

  describe('POST route', () => {
    const newExpense: CreateExpenseDto = {
      category: 'NEW Category',
      currency: Currency.USD,
      amount: 200,
    };

    it('should return created expense', (done) => {
      request(app)
        .post(`/api/expenses`)
        .send(newExpense)
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body).toMatchObject(newExpense);
          done();
        })
        .catch(done);
    });
  });
});
