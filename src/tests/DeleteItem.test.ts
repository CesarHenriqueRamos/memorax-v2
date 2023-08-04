import { DeleteItem } from '../functions/functions';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestoreMock } from '../firebase-mock.d';


// Crie um mock para a função deleteDoc do Firestore
jest.mock('firebase/firestore', () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Testes para a função DeleteItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve deletar o item quando não estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'documentoId';
    const block = false;

    const docRefMock = firestoreMock.collection('tasks').doc(id);
    (doc as jest.Mock).mockReturnValueOnce(docRefMock);

    await DeleteItem(dbMock, id, block);

    expect(doc).toHaveBeenCalledWith(dbMock, 'tasks', id);
    expect(deleteDoc).toHaveBeenCalledWith(docRefMock);
  });

  test('Não deve deletar o item quando estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'documentoId';
    const block = true;

    await DeleteItem(dbMock, id, block);

    expect(doc).not.toHaveBeenCalled();
    expect(deleteDoc).not.toHaveBeenCalled();
  });
});
