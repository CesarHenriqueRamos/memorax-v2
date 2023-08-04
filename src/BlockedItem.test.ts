import { BlockedItem } from './functions/functions';
import { updateDoc, doc } from 'firebase/firestore';
import { firestoreMock } from './firebase-mock.d';


// Crie um mock para a função updateDoc do Firestore
jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Testes para a função BlockedItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve desbloquear o item quando estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'd4dKaz23maoCVSBPcesar';
    const block = true;

    const docRefMock = firestoreMock.collection('tasks').doc(id);
    (doc as jest.Mock).mockReturnValueOnce(docRefMock);

    await BlockedItem(dbMock, id, block);

    expect(doc).toHaveBeenCalledWith(dbMock, 'tasks', id);
    expect(updateDoc).toHaveBeenCalledWith(docRefMock, { block: false });
  });

  test('Deve bloquear o item quando não estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'd4dKaz23maoCVSBPcesar';
    const block = false;

    const docRefMock = firestoreMock.collection('tasks').doc(id);
    (doc as jest.Mock).mockReturnValueOnce(docRefMock);

    await BlockedItem(dbMock, id, block);

    expect(doc).toHaveBeenCalledWith(dbMock, 'tasks', id);
    expect(updateDoc).toHaveBeenCalledWith(docRefMock, { block: true });
  });
});
