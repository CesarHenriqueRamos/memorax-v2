import { useEffect, useState } from "react"
import { app } from "../../services/firebaseConfig";
import { collection, getFirestore, onSnapshot, getDocs } from "firebase/firestore";
import { useAuthGoogle } from "../../hooks/authGoogle";
import { BlockedItem, DeleteItem, FinalizeItem, Search } from "../../functions/functions";
import { Card } from "../../components/Card";
import { ModalNotification } from "../../components/ModalNotification";
import { ModalEdit } from "../../components/ModalEdit";
import { Header } from "../../components/Header";
import styles from './Home.module.css'

export const Home = () => {
  const {user,signOut} = useAuthGoogle();

  const [dataInfo, setDataInfo] = useState([]);
  const [campoFiltrado, setCampoFiltrado] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [block, setBlock] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalFinalize, setModalFinalize] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalBlocked, setModalBlocked] = useState(false);

  const db = getFirestore(app);
  const confCollection = collection(db, "tasks");

  useEffect(() => {
    if(campoFiltrado.length === 0){
      const unsubscribe = onSnapshot(confCollection, (snapshot) => {
        const updatedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDataInfo(updatedData);
      });

      return () => unsubscribe();
    }
    
  }, [confCollection,campoFiltrado]);

  const deleteItem = async (id,block) => {
    DeleteItem(db,id,block);
    setModalDelete(true);
    setCampoFiltrado("");
    reloaded()
  }
  const blockedItem = async (id,block) => {
    setBlock(!block)
    BlockedItem(db,id,block); 
    setModalBlocked(true); 
    setCampoFiltrado("");
    reloaded()
  }

  const finalizeItem = async(id,block) => {
    FinalizeItem(db,id,block,user.displayName);
    setModalFinalize(true);
    setCampoFiltrado("");
    reloaded()
  }

  const search = async () => {
    if(campoFiltrado.length > 0){
    const data = await Search(db, campoFiltrado);
      setDataInfo(data);    
    }
  }

  const handleOpenModal = (block,title, description,id) => {
    setTitle(title);
    setDescription(description);
    setId(id);
    setBlock(block)
    setModalOpen(true);
  };

  const reloaded = async () =>{
    const data = await getDocs(confCollection);
    const dataInfo = data.docs.map((doc)=> ({...doc.data(), id: doc.id}))
    setDataInfo(dataInfo);
  }
    return (
      <div className={"container"}>

      <Header nameLink="Criar" link="/create" />
      <div className={styles['container-box']}>
        <div className={styles.box}>
          <div className={styles["box-search"]}>
            <input type="text" name="" id="" className={styles["input-box-search"]} value={campoFiltrado} onChange={e => setCampoFiltrado(e.target.value)} />
            <button className={styles["button-box-search"]} onClick={() => search()}>pesquisar</button>
          </div>
          <div className={styles["container-card"]}>
            {dataInfo.length === 0 &&
                <h2>Não a cards Criados</h2>
            }
          {
            
            dataInfo.map(item => {
              return (
                
                <Card
                 dataItem={item}
                 handleblockedItem={blockedItem}
                 handlefinalizeItem={finalizeItem}
                 handleOpenModal={handleOpenModal}
                 handledeleteItem={deleteItem}
                />
              )
            })
          }
          </div>
        </div>
      </div>
      {modalOpen && (
        <ModalEdit 
        titleItem={title}
        descriptionItem={description} 
        onChangeModalOpen={data => setModalOpen(data)}
        onChangeModalMensage={data => setModalEdit(data)}
        onChangeeaload={()=> reloaded()}
        id={id}
        block={block} />
      )}
      {modalEdit && 
        <ModalNotification title="Dados Editados com Sucesso"
        handleCloseModalNotification={setModalEdit} />
      }
      {modalFinalize && 
        <ModalNotification title="Encerrado a atividade com Sucesso"
        handleCloseModalNotification={setModalFinalize} />
      }
      {modalDelete && 
        <ModalNotification title="Item deletado com Sucesso"
        handleCloseModalNotification={setModalDelete} />
      }
      {modalBlocked && 
        <ModalNotification title={block?"Item Bloqueado com Sucesso":"Item Desbloqueado com Sucesso"}
        handleCloseModalNotification={setModalBlocked} />
      }
    </div> 
    
    )
  }