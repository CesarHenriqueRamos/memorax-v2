import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ModalEdit } from '.';

// Mock para a função UpdateItem
jest.mock('../../functions/functions', () => ({
  UpdateItem: jest.fn(),
}));

// Mock para as funções de callback
const onChangeModalOpen = jest.fn();
const onChangeModalMensage = jest.fn();
const onChangeeaload = jest.fn();

// Dados de exemplo para o ModalEditProps
const modalProps = {
  titleItem: 'Test Title',
  descriptionItem: 'Test Description',
  id: '1',
  block: false,
  onChangeModalOpen,
  onChangeModalMensage,
  onChangeeaload,
};

describe('ModalEdit Component', () => {
  it('renders correctly', () => {
    render(<ModalEdit {...modalProps} />);
    
    expect(screen.getByText('Editar Informações')).toBeInTheDocument();
    expect(screen.getByLabelText('Titulo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('handles close modal', () => {
    render(<ModalEdit {...modalProps} />);
    const closeButton = screen.getByText('Fechar');

    fireEvent.click(closeButton);

    expect(onChangeModalOpen).toHaveBeenCalledWith(false);
  });

  it('handles save edit', async () => {
    render(<ModalEdit {...modalProps} />);
    const saveButton = screen.getByText('Salvar');
    const titleInput = screen.getByLabelText('Titulo:');
    const descriptionInput = screen.getByLabelText('Descrição:');

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.click(saveButton);

    // Espera a função UpdateItem ser chamada
    await waitFor(() => expect(onChangeModalMensage).toHaveBeenCalledWith(true));
    await waitFor(() => expect(onChangeModalOpen).toHaveBeenCalledWith(false));
    await waitFor(() => expect(onChangeeaload).toHaveBeenCalled());

    // Verifica se a função UpdateItem foi chamada com os argumentos corretos
    expect(require('../../functions/functions').UpdateItem).toHaveBeenCalledWith(
      expect.any(Object),
      '1',
      false,
      'Updated Title',
      'Updated Description'
    );
  });
});
