import { FinalizeItem } from './functions/functions';
import { updateDoc, doc } from 'firebase/firestore';
import { firestoreMock } from './firebase-mock.d';


// Crie um mock para a função updateDoc do Firestore
jest.mock('firebase/firestore', () => ({
  updateDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('Testes para a função FinalizeItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Testes para a função FinalizeItem', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Deve finalizar o item quando não estiver bloqueado', async () => {
      // Arrange
      const dbMock = firestoreMock;
      const id = 'd4dKaz23maoCVSBPcesar';
      const block = false;
      const userName = 'teste';
      const docRefMock = firestoreMock.collection('tasks').doc(id);
      (doc as jest.Mock).mockReturnValueOnce(docRefMock);
  
      // Act
      await FinalizeItem(dbMock, id, block, userName);
  
      // Assert
      expect(doc).toHaveBeenCalledWith(dbMock, 'tasks', id);
      expect(updateDoc).toHaveBeenCalledWith(docRefMock, { finalize: true, name_finalize: userName });
    });
  });

  test('Não deve finalizar o item quando estiver bloqueado', async () => {
    const dbMock = firestoreMock;
    const id = 'd4dKaz23maoCVSBPcesar';
    const block = true;
    const userName = 'teste';

    await FinalizeItem(dbMock, id, block,userName);

    expect(doc).not.toHaveBeenCalled();
    expect(updateDoc).not.toHaveBeenCalled();
  });
});
