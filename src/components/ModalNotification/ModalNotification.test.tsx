import { render, fireEvent, screen } from '@testing-library/react';
import { ModalNotification } from '.';

test('ModalNotification component renders correctly', () => {
  const handleCloseModalNotification = jest.fn();

  render(
    <ModalNotification
      title="Test Title"
      handleCloseModalNotification={handleCloseModalNotification}
    />
  );

  expect(screen.getByText('Test Title')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Fechar'));

  expect(handleCloseModalNotification).toHaveBeenCalledWith(false);
});
