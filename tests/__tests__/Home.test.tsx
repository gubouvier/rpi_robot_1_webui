import { render, screen, waitFor } from '@testing-library/react'
import Home from '../../src/app/page'

const mockResponse = (data: any) : Response => {
  return {
    // ok: true,
    // status: 200,
    json: async () => data,
    // headers: new Headers(),
    // redirected: false,
    // statusText: 'OK',
    // type: 'basic',
    // url: '',
    // clone: () => mockResponse(data),
    // body: null,
    // bodyUsed: false,
    // arrayBuffer: async () => new ArrayBuffer(0),
    // blob: async () => new Blob(),
    // formData: async () => new FormData(),
    // text: async () => JSON.stringify(data),
  } as Response;
};

global.fetch = jest.fn(() =>
  Promise.resolve(mockResponse({ data: 'mocked data'}))
);

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Home />);
    await waitFor(() => {
      const heading = screen.getByRole('heading', {
        name: /RPI robot dashboard/i,
      });
      expect(heading).toBeInTheDocument()
    });
  })
});