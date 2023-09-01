import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Create } from '.';
import { useAuthGoogle } from '../../hooks/authGoogle';
import { Save } from '../../functions/functions';
import { getFirestore } from '@firebase/firestore';
import { app } from '../../services/firebaseConfig';
import { ModalNotification } from '../../components/ModalNotification';

// Crie um mock para useAuthGoogle
jest.mock('../../hooks/authGoogle');

// Crie um mock para Save
jest.mock('../../functions/functions');

// Crie um mock para getFirestore e app
jest.mock('@firebase/firestore');
jest.mock('../../services/firebaseConfig', () => ({ app: {} }));

// Crie um mock para ModalNotification
jest.mock('../../components/ModalNotification', () => ({
  ModalNotification: jest.fn(() => null),
}));

describe('Create Component', () => {
  beforeEach(() => {
    // Restaure todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    // Simule o retorno do hook useAuthGoogle
    (useAuthGoogle as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
      },
      signOut: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Titulo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });  
});
