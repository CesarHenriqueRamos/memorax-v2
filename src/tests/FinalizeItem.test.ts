import { FinalizeItem } from '../functions/functions';
import { updateDoc, doc } from 'firebase/firestore';
import { firestoreMock } from '../firebase-mock.d';


// Crie um mock para a função updateDoc do Firestore
jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Testes para a função FinalizeItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve finalizar o item quando não estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'documentoId';
    const block = false;

    const docRefMock = firestoreMock.collection('tasks').doc(id);
    (doc as jest.Mock).mockReturnValueOnce(docRefMock);

    await FinalizeItem(dbMock, id, block);

    expect(doc).toHaveBeenCalledWith(dbMock, 'tasks', id);
    expect(updateDoc).toHaveBeenCalledWith(docRefMock, { finalize: true });
  });

  test('Não deve finalizar o item quando estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'documentoId';
    const block = true;

    await FinalizeItem(dbMock, id, block);

    expect(doc).not.toHaveBeenCalled();
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
