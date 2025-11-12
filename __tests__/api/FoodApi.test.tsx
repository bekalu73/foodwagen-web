import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchData } from '@/lib/use-fetch-data';
import { ReactNode } from 'react';

// Mock axios
jest.mock('axios', () => ({
  request: jest.fn(() => 
    Promise.resolve({
      data: [
        {
          id: '1',
          name: 'Mock Food',
          rating: 4.5,
          restaurantName: 'Mock Restaurant'
        }
      ]
    })
  )
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Food API Integration', () => {
  it('successfully fetches and displays food data', async () => {
    const { result } = renderHook(
      () => useFetchData(['food'], '/Food', undefined, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual([
      {
        id: '1',
        name: 'Mock Food',
        rating: 4.5,
        restaurantName: 'Mock Restaurant'
      }
    ]);
  });

  it('handles API error gracefully', async () => {
    // Mock axios to reject
    const axios = require('axios');
    axios.request.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(
      () => useFetchData(['food'], '/Food', undefined, true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});