import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from '../../functions/functions';
import { Home } from '.';


jest.mock('../../hooks/authGoogle', () => ({
  useAuthGoogle: jest.fn(() => ({ user: { displayName: 'Test User' } })),
}));

jest.mock('../../functions/functions', () => ({
  BlockedItem: jest.fn(),
  DeleteItem: jest.fn(),
  FinalizeItem: jest.fn(),
  Search: jest.fn(),
}));

jest.mock('../../hooks/authGoogle', () => ({
    useAuthGoogle: () => ({ user: { displayName: 'Test User' } }),
  }));

test('deve renderizar o componente Home corretamente', async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText('Criar')).toBeInTheDocument(); 

  const searchInput = screen.getByPlaceholderText('Pesquisar...');
  const searchButton = screen.getByText('Pesquisar');
  
  fireEvent.change(searchInput, { target: { value: 'termo de pesquisa' } });
  fireEvent.click(searchButton);

  expect(Search).toHaveBeenCalledWith(expect.anything(), 'termo de pesquisa');

  const sampleButton = screen.getByText('Pesquisar');
  fireEvent.click(sampleButton);


});
