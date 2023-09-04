
import { render, screen } from '@testing-library/react';
import { Card } from '.';

jest.mock('../../hooks/authGoogle', () => ({
  useAuthGoogle: () => ({
    user: { email: 'test@example.com' }, 
  }),
}));

test('Card component renders correctly', () => {
  const dataItem = {
    id: '1',
    title: 'Test Title',
    description: 'Test Description',
    user_create: 'test@example.com',
    name_user_create: 'Test User',
    block: false,
    finalize: false,
    name_finalize: '',
  };

  const handleblockedItem = jest.fn();
  const handlefinalizeItem = jest.fn();
  const handleOpenModal = jest.fn();
  const handledeleteItem = jest.fn();

  const props: any = {
    dataItem,
    handleblockedItem,
    handlefinalizeItem,
    handleOpenModal,
    handledeleteItem,
  };

  render(<Card {...props} />);

  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('Criado por Test User')).toBeInTheDocument();

});
