const { FinalizeItem } = require('./helpers/functions'); 
const { updateDoc, doc } = require('firebase/firestore'); 
const { firestoreMock } = require('./firebase-mock-config'); 

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
    doc.mockReturnValueOnce(docRefMock);

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
