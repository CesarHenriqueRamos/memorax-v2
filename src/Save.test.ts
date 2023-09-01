import { Save } from './functions/functions';
import { addDoc, collection, Firestore } from 'firebase/firestore'; 
import { firestoreMock } from './firebase-mock.d';

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'), 
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

test('Deve retornar "Cadastrado com sucesso" ao salvar um novo documento', async () => {
  const confCollectionMock = firestoreMock.collection('tasks');
  const responseMock = { type: 'document' };

  // Mock a função addDoc 
  (addDoc as jest.Mock).mockResolvedValueOnce(responseMock);
  (collection as jest.Mock).mockReturnValueOnce(confCollectionMock);

  const title = 'Título da tarefa';
  const description = 'Descrição da tarefa';
  const infoUser = {
    email: 'usuario@teste.com',
    name: 'Usuário de Teste',
  };

  const result = await Save(confCollectionMock as unknown as Firestore, title, description, infoUser);

  expect(result).toBe('Cadastrado com sucesso');
  expect(addDoc).toHaveBeenCalledWith(confCollectionMock, {
    title,
    description,
    user_create: infoUser.email,
    name_user_create: infoUser.name,
    block: false,
    finalize: false,
    name_finalize: '',
  });
});
