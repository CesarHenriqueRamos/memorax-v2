import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Create } from '.';
import { useAuthGoogle } from '../../hooks/authGoogle';


jest.mock('../../hooks/authGoogle');

jest.mock('../../functions/functions');

jest.mock('@firebase/firestore');
jest.mock('../../services/firebaseConfig', () => ({ app: {} }));

jest.mock('../../components/ModalNotification', () => ({
  ModalNotification: jest.fn(() => null),
}));

describe('Create Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
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
