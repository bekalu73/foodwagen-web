import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeaturedCards from '@/features/Home/FeaturedCards';

// Mock the API hook
jest.mock('@/lib/use-fetch-data', () => ({
  useFetchData: jest.fn(() => ({
    data: [
      {
        id: '1',
        name: 'Test Food',
        rating: 4.5,
        image: '/test-image.jpg',
        restaurantName: 'Test Restaurant',
        logo: '/test-logo.jpg',
        status: 'Open Now',
        price: 15
      }
    ],
    isLoading: false
  }))
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

describe('FoodCard Component Rendering', () => {
  it('renders food card with expected props', () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <FeaturedCards />
      </QueryClientProvider>
    );

    // Verify food name is displayed
    expect(screen.getByText('Test Food')).toBeInTheDocument();
    
    // Verify restaurant name is displayed
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    
    // Verify rating is displayed
    expect(screen.getByText('4.5')).toBeInTheDocument();
    
    // Verify status is displayed
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });
});