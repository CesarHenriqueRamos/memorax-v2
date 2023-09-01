import { render, fireEvent, screen } from '@testing-library/react';
import { ModalNotification } from '.';

test('ModalNotification component renders correctly', () => {
  const handleCloseModalNotification = jest.fn();

  const { getByText } = render(
    <ModalNotification
      title="Test Title"
      handleCloseModalNotification={handleCloseModalNotification}
    />
  );

  // Assert that the component renders the title
  expect(screen.getByText('Test Title')).toBeInTheDocument();

  // Simulate button click
  fireEvent.click(screen.getByText('Fechar'));

  // Assert that the handleCloseModalNotification function was called with the correct argument
  expect(handleCloseModalNotification).toHaveBeenCalledWith(false);
});
