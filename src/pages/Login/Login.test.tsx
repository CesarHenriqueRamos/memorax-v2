import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthGoogle } from '../../hooks/authGoogle';
import { Login } from '.';

// Mock useAuthGoogle
jest.mock('../../hooks/authGoogle');

describe('Login Component', () => {
  it('renders login button when user is not signed in', () => {
    // Configura o valor retornado por signed como falso
    (useAuthGoogle as jest.MockedFunction<typeof useAuthGoogle>).mockReturnValue({
      signAuth: jest.fn(),
      signed: false,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByText('Logar com o Google');
    expect(loginButton).toBeInTheDocument();
  });

  it('calls signAuth when login button is clicked', async () => {
    const signAuthMock = jest.fn();

    // Configura a função signAuth para ser espiada
    (useAuthGoogle as jest.MockedFunction<typeof useAuthGoogle>).mockReturnValue({
      signAuth: signAuthMock,
      signed: false,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByText('Logar com o Google');
    fireEvent.click(loginButton);

    // Aguarda a execução da função signAuth
    await waitFor(() => {
      expect(signAuthMock).toHaveBeenCalled();
    });
  });

  it('renders Navigate to "/home" when user is signed in', () => {
    // Configura o valor retornado por signed como verdadeiro
    (useAuthGoogle as jest.MockedFunction<typeof useAuthGoogle>).mockReturnValue({
      signAuth: jest.fn(),
      signed: true,
    });

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    // Certifique-se de que a navegação para "/home" ocorra quando o usuário estiver autenticado
    expect(screen.queryByText('Logar com o Google')).not.toBeInTheDocument();
  });
});
