// firebase-mock-config.js

const firebaseMock = require('firebase-mock');

// Crie uma instância do Firestore mockado
const firestoreMock = new firebaseMock.MockFirestore();

// Adicione coleções e documentos fictícios para testar
const tasksCollection = firestoreMock.collection('tasks');
tasksCollection.doc('documentoId').set({
  title: 'Tarefa de teste',
  description: 'Descrição da tarefa de teste',
  user_create: 'usuario@teste.com',
  name_user_create: 'Usuário de Teste',
  block: false,
  finalize: false,
  name_finalize: ''
});

module.exports = {
  firestoreMock
};
