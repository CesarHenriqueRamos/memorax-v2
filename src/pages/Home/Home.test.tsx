import { act ,render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from '../../functions/functions';
import { Home } from '.';

// Suponhamos que você tenha um mock para useAuthGoogle, BlockedItem, DeleteItem, FinalizeItem, Search, e outros componentes / funções relevantes

// Mock para useAuthGoogle
jest.mock('../../hooks/authGoogle', () => ({
  useAuthGoogle: jest.fn(() => ({ user: { displayName: 'Test User' } })),
}));

// Mock para BlockedItem, DeleteItem, FinalizeItem, Search, e outros componentes / funções relevantes
jest.mock('../../functions/functions', () => ({
  BlockedItem: jest.fn(),
  DeleteItem: jest.fn(),
  FinalizeItem: jest.fn(),
  Search: jest.fn(),
  // Adicione outros mocks conforme necessário
}));
// Crie um mock personalizado para useAuthGoogle
jest.mock('../../hooks/authGoogle', () => ({
    useAuthGoogle: () => ({ user: { displayName: 'Test User' } }),
  }));

test('deve renderizar o componente Home corretamente', async () => {
  // Renderize o componente Home
  render(
    // Envolve o componente Home em um MemoryRouter
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Verifique se o componente Home foi renderizado corretamente
  expect(screen.getByText('Criar')).toBeInTheDocument(); // Certifique-se de ajustar o texto conforme apropriado

  // Simule a entrada de texto no campo de filtro e clique no botão de pesquisa
  const searchInput = screen.getByPlaceholderText('Pesquisar...');
  const searchButton = screen.getByText('Pesquisar');
  
  fireEvent.change(searchInput, { target: { value: 'termo de pesquisa' } });
  fireEvent.click(searchButton);

  // Verifique se BlockedItem, DeleteItem, FinalizeItem, Search ou outros foram chamados conforme o esperado
  expect(Search).toHaveBeenCalledWith(expect.anything(), 'termo de pesquisa');
  // Adicione verificações para outros casos de uso

  // Faça outras verificações necessárias com base no comportamento esperado

  // Exemplo: Verifique se um botão está na tela e simule um clique nele
  const sampleButton = screen.getByText('Pesquisar');
  fireEvent.click(sampleButton);


});
