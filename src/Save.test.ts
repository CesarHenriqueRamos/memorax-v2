import { Save } from './functions/functions';
import { addDoc } from 'firebase/firestore';
import { firestoreMock } from './firebase-mock.d';

// Crie um mock para a função addDoc do Firestore
jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
}));

describe('Testes para a função Save', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar "Cadastrado com sucesso" ao salvar um novo documento', async () => {
    const confCollectionMock = firestoreMock.collection('tasks');
    const responseMock = { type: 'document' } as any; 

    (addDoc as jest.Mock).mockResolvedValueOnce(responseMock);

    const title = 'Título da tarefa';
    const description = 'Descrição da tarefa';
    const infoUser = {
      email: 'usuario@teste.com',
      displayName: 'Usuário de Teste',
    };

    const result = await Save(confCollectionMock, title, description, infoUser);

    expect(result).toBe('Cadastrado com sucesso'); 
    expect(addDoc).toHaveBeenCalledWith(confCollectionMock, {
      title,
      description,
      user_create: infoUser.email,
      name_user_create: infoUser.displayName,
      block: false,
      finalize: false,
      name_finalize: '',
    }); 
  });

  test('Deve lançar um erro ao falhar ao salvar o documento', async () => {
    const confCollectionMock = firestoreMock.collection('conf'); 
    const errorMock = new Error('Erro ao salvar documento'); 

    (addDoc as jest.Mock).mockRejectedValueOnce(errorMock);

    const title = 'Título da tarefa';
    const description = 'Descrição da tarefa';
    const infoUser = {
      email: 'usuario@teste.com',
      displayName: 'Usuário de Teste',
    };

    try {
      await Save(confCollectionMock, title, description, infoUser);
    } catch (error) {
      expect(error).toBe(errorMock);
    }
  });
});
