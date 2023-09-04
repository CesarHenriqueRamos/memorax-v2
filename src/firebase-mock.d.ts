import { MockFirestore } from 'firebase-mock';

const firestoreMock = new MockFirestore();

const tasksCollection = firestoreMock.collection('tasks');
tasksCollection.doc('documentoId').set({
  title: 'Tarefa de teste',
  description: 'Descrição da tarefa de teste',
  user_create: 'usuario@teste.com',
  name_user_create: 'Usuário de Teste',
  block: false,
  finalize: false,
  name_finalize: '',
});

export {
  firestoreMock
};
