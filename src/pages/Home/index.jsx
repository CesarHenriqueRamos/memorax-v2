import { useEffect, useState } from "react"
import { app } from "../../services/firebaseConfig";
import { collection, getDocs ,getFirestore, query, where, or,  onSnapshot } from "firebase/firestore";
import "./style.css"
import { Link } from "react-router-dom";
// import { BlockedItem, DeleteItem, FinalizeItem, UpdateItem } from "../../helpers/functions";
import { useAuthGoogle } from "../../hooks/authGoogle";
import { BlockedItem, DeleteItem, FinalizeItem, UpdateItem } from "../../functions/functions";

export const Home = () => {
  const {user,signOut} = useAuthGoogle();

  const [dataInfo, setDataInfo] = useState([]);
  const [campoFiltrado, setCampoFiltrado] = useState("");
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [block, setBlock] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const db = getFirestore(app);
  const confCollection = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onSnapshot(confCollection, (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDataInfo(updatedData);
    });

    return () => unsubscribe();
  }, [confCollection]);

  const deleteItem = async (id,block) => {
    DeleteItem(db,id,block);
  }
  const blockedItem = async (db,id,block) => {
    BlockedItem(id,block);  
  }

  const finalizeItem = async(db,id,block) => {
    FinalizeItem(id,block);
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
    UpdateItem(id,block,title,description);
    
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
                <div className={item.finalize?"finalise card": "card"} key={item.id}  >
                  <p className="create-user">{item.name_user_create}</p>
                  <h4 className="title">{item.title}</h4>
                  <p className="description">{item.description}</p>
                  <div className="card-buttons">
                    {
                     !item.finalize && 
                     <>
                     
                    
                    {item.user_create === user.email &&
                      <>
                        {
                        !item.block ?
                        <button className="button button-block" onClick={() => blockedItem(item.id,item.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"/></svg></button> :
                        <button className="button button-block" onClick={() => blockedItem(item.id,item.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg></button>
                    }
                      </>
                    }
                    {
                      !item.block ?
                      <>
                        <button className="button button-finalisation" onClick={() => finalizeItem(item.id,item.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
                        <button className="button button-update" onClick={() => handleOpenModal(item.block,item.title,item.description, item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
                        <button className="button button-delete" onClick={() => deleteItem(item.id, item.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#fff" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                      </>:<></>
                    } 
                    </>
                  }
                   </div>
                </div>
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
           <div className="form-group">
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
    </div> 
    
    )
  }