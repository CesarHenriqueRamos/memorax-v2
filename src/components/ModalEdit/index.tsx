import { useState } from "react";
import { UpdateItem } from "../../functions/functions";
import './style.css';

interface ModalEditProps{
    titleItem:string;
    descriptionItem:string;
    id:string;
    block:boolean;
    db:any;
    onChangeModalOpen: (data:boolean)=> void;
    onChangeModalMensage: (data:boolean)=> void;
}

export function ModalEdit({titleItem, descriptionItem, db, id,block,onChangeModalOpen,onChangeModalMensage}:ModalEditProps){
    const [title, setTitle] = useState(titleItem);
  const [description, setDescription] = useState(descriptionItem);
    const handleCloseModal = () => {
        onChangeModalOpen(false);
      };
    const savaEdit = () => {
        UpdateItem(db,id,block,title,description);
        onChangeModalMensage(true)
        onChangeModalOpen(false)
      }
    return(
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
    )
}