import 'isomorphic-fetch';
import { parseResponseData } from './expenses-api.service';

describe('parseResponseData', () => {
  const data = { data: 'MY DATA' };

  it('should work with 200 response', async () => {
    const response = new Response(JSON.stringify(data), { status: 200 });
    const result = await parseResponseData(response);

    expect(result).toEqual({ hasErrors: false, data });
  });

  it('should work with 201 response', async () => {
    const response = new Response(JSON.stringify(data), { status: 201 });
    const result = await parseResponseData(response);

    expect(result).toEqual({ hasErrors: false, data });
  });

  it('should work with 404 response', async () => {
    const response = new Response(JSON.stringify(data), { status: 404 });
    const result = await parseResponseData(response);

    expect(result).toEqual({ hasErrors: true, data: null });
  });

  it('should handle corrupted JSON', async () => {
    const response = new Response('I am not json =(', { status: 404 });
    const result = await parseResponseData(response);

    expect(result).toEqual({ hasErrors: true, data: null });
  });
});
