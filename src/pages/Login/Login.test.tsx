import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthGoogle } from '../../hooks/authGoogle';
import { Login } from '.';

jest.mock('../../hooks/authGoogle');

describe('Login Component', () => {
  it('renders login button when user is not signed in', () => {
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

    await waitFor(() => {
      expect(signAuthMock).toHaveBeenCalled();
    });
  });

  it('renders Navigate to "/home" when user is signed in', () => {
    (useAuthGoogle as jest.MockedFunction<typeof useAuthGoogle>).mockReturnValue({
      signAuth: jest.fn(),
      signed: true,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Login />
      </MemoryRouter>
    );

    expect(screen.queryByText('Logar com o Google')).not.toBeInTheDocument();
  });
});
