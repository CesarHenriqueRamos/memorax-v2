import { deleteDoc, doc, updateDoc,addDoc, collection, Firestore, query, where, getDocs } from 'firebase/firestore';


const Save = async (db:Firestore,title: string, description: string, infoUser: any) => {

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

const Search = async (db: Firestore, campoFiltrado: string) => {
  try {
    const tasksCollection = collection(db, 'tasks');
    let data: any[] = [];
    const consultaFiltradaTitle = query(tasksCollection,
      where('title', '==', campoFiltrado)
    );
    const dataTitle = await getDocs(consultaFiltradaTitle);

    const consultaFiltradaUserCreate = query(tasksCollection,
      where('name_user_create', '==', campoFiltrado)
    );
    const dataUserCreate = await getDocs(consultaFiltradaUserCreate);

    if(dataTitle.docs.length > 0){
      data = dataTitle.docs.map((doc)=> ({...doc.data(), id: doc.id}))
    }
    if(dataUserCreate.docs.length > 0){
      data = dataUserCreate.docs.map((doc)=> ({...doc.data(), id: doc.id}))
    }

   
    return data;
  } catch (error) {
    throw error;
  }
};
  
// Função para deletar um item no Firestore
const DeleteItem = async (db:Firestore,id:string, block:boolean) => {
  if (!block) {
    const docRef = doc(db, 'tasks', id);
    await deleteDoc(docRef);
  }
};

// Função para bloquear/desbloquear um item no Firestore
const BlockedItem = async (db:Firestore,id:string, block:boolean) => {

  const docRef = doc(db, 'tasks', id);
  await updateDoc(docRef, {
    block: !block
  });
};

// Função para finalizar um item no Firestore
const FinalizeItem = async (db:Firestore,id:string, block:boolean,userName:string) => {
  if (!block) {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, {
      finalize: true,
      name_finalize:userName
    });
  }
};

const UpdateItem = async (db:Firestore,id:string, block:boolean, title:string,description:string) => {
    if (!block) {
      const docRef = doc(db, 'tasks', id);
      await updateDoc(docRef, {
        title,description
      });
    }
  };

  export {Save,DeleteItem, BlockedItem, FinalizeItem, UpdateItem, Search}