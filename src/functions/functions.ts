import { deleteDoc, doc, updateDoc,addDoc, getFirestore, collection } from 'firebase/firestore';
import { app } from '../services/firebaseConfig';

const db = getFirestore(app);

const Save = async (title: string, description: string, infoUser: any) => {

  const taskData = {
    title,
    description,
    user_create: infoUser.email,
    name_user_create: infoUser.name,
    block: false,
    finalize: false,
    name_finalize: ""
  };

  try {
    const tasksCollection = collection(db, 'tasks'); 

    await addDoc(tasksCollection, taskData);

    return "Cadastrado com sucesso";
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    throw error;
  }
};

  


// Função para deletar um item no Firestore
const DeleteItem = async (id:string, block:boolean) => {
  if (!block) {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
  }
};

// Função para bloquear/desbloquear um item no Firestore
const BlockedItem = async (id:string, block:boolean) => {
  const docRef = doc(db, 'tasks', id);
  await updateDoc(docRef, {
    block: !block
  });
};

// Função para finalizar um item no Firestore
const FinalizeItem = async (id:string, block:boolean) => {
  if (!block) {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, {
      finalize: true
    });
  }
};

const UpdateItem = async (id:string, block:boolean, title:string,description:string) => {
    if (!block) {
      const docRef = doc(db, 'tasks', id);
      await updateDoc(docRef, {
        title,description
      });
    }
  };

  export {Save,DeleteItem, BlockedItem, FinalizeItem, UpdateItem}