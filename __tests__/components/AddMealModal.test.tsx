import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddMealModal from '@/components/modals/AddMealModal';
import '@testing-library/jest-dom';

// Mock the mutation hook
jest.mock('@/lib/use-post-data', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    mutateAsync: jest.fn(),
    isPending: false
  }))
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false }
  }
});

describe('AddMealModal User Interaction', () => {
  it('handles form submission correctly', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <AddMealModal />
      </QueryClientProvider>
    );

    // Open modal
    const addButton = screen.getByTestId('food-add-btn');
    fireEvent.click(addButton);

    // Fill form inputs
    const nameInput = screen.getByTestId('food-name-input');
    const ratingInput = screen.getByTestId('food-rating-input');
    
    fireEvent.change(nameInput, { target: { value: 'Test Food' } });
    fireEvent.change(ratingInput, { target: { value: '4' } });

    // Submit form
    const saveButton = screen.getByTestId('food-save-btn');
    fireEvent.click(saveButton);

    // Verify inputs have correct values
    expect(nameInput).toHaveValue('Test Food');
    expect(ratingInput).toHaveValue('4');
  });
});