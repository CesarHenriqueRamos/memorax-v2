import { useEffect, useState } from "react"
import { app } from "../../services/firebaseConfig";
import { collection, getDocs ,getFirestore, query, where, or,  onSnapshot } from "firebase/firestore";
import "./style.css"
import { Link } from "react-router-dom";
// import { BlockedItem, DeleteItem, FinalizeItem, UpdateItem } from "../../helpers/functions";
import { useAuthGoogle } from "../../hooks/authGoogle";
import { BlockedItem, DeleteItem, FinalizeItem, UpdateItem } from "../../functions/functions";
import { Card } from "../../components/Card/inde.";
import { ModalNotification } from "../../components/ModalNotification";

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
  }
  const blockedItem = async (id,block) => {
    setBlock(!block)
    BlockedItem(db,id,block); 
    setModalBlocked(true); 
    setCampoFiltrado("");
  }

  const finalizeItem = async(id,block) => {
    FinalizeItem(db,id,block,user.displayName);
    setModalFinalize(true);
    setCampoFiltrado("");
  }

  const search = async () => {
    if(campoFiltrado.length > 0){
    const consultaFiltrada = query(confCollection, or(
      where('name_user_create', '==', campoFiltrado),
      where('title', '==', campoFiltrado)));
    const data = await getDocs(consultaFiltrada);
      setDataInfo(data.docs.map((doc)=> ({...doc.data(), id: doc.id})));    
    }
  }

  const handleOpenModal = (block,title, description,id) => {
    setTitle(title);
    setDescription(description);
    setId(id);
    setBlock(block)
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const savaEdit = () => {
    UpdateItem(db,id,block,title,description);
    setModalEdit(true);
    setCampoFiltrado("");
    setModalOpen(false)
  }

    return (
      <div className={"container"}>

      <div className='header'>
        <h1>MemoraX</h1>
        <ul>
          <li><Link to="/create">Criar</Link></li>
          <li><button onClick={signOut} className="close">Sair</button></li>
        </ul>
      </div>
      <div className='container-box'>
        <div className='box'>
          <div className="box-search">
            <input type="text" name="" id="" className="input-box-search" value={campoFiltrado} onChange={e => setCampoFiltrado(e.target.value)} />
            <button className="button-box-search" onClick={() => search()}>pesquisar</button>
          </div>
          <div className="container-card">
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
        <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h2 className="title-modal">Editar Informações</h2>
           <div className="form-group-modal">
            <label htmlFor="title" className="label">Titulo:</label>
            <input type="text" name="title" id="title" value={title}
             onChange={e => setTitle(e.target.value)} className="form-input-modal" />
           </div>
           <div className="form-group-modal">
            <label htmlFor="description" className="label">Descrição:</label>
            <input type="text" name="description" id="description"
             value={description} onChange={e => setDescription(e.target.value)} className="form-input-modal" />
           </div>
            <div className="form-group-modal flex">
              <button className="button-modal" onClick={handleCloseModal}>Fechar</button>
              <button className="button-modal success" onClick={()=>savaEdit()}>Salvar</button>
            </div>
            
          </div>
        </div>
        </div>
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