import { useState } from "react";
import { UpdateItem } from "../../functions/functions";
import styles from './ModalEdit.module.css'
import { getFirestore } from "firebase/firestore";
import { app } from "../../services/firebaseConfig";

interface ModalEditProps{
    titleItem:string;
    descriptionItem:string;
    id:string;
    block:boolean;
    onChangeModalOpen: (data:boolean)=> void;
    onChangeModalMensage: (data:boolean)=> void;
    onChangeeaload: ()=> void;
}

export function ModalEdit({titleItem, descriptionItem,  id,block,onChangeModalOpen,onChangeModalMensage,onChangeeaload}:ModalEditProps){
  const db = getFirestore(app);
  const [title, setTitle] = useState(titleItem);
  const [description, setDescription] = useState(descriptionItem);
    const handleCloseModal = () => {
        onChangeModalOpen(false);
      };
    const savaEdit = () => {
        UpdateItem(db,id,block,title,description);
        onChangeModalMensage(true);
        onChangeModalOpen(false);
        onChangeeaload();
      }
    return(
        <div className={styles['modal-overlay']}>
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <h2 className={styles["title-modal"]}>Editar Informações</h2>
           <div className={styles["form-group-modal"]}>
            <label htmlFor="title" className={styles.label}>Titulo:</label>
            <input type="text" name="title" id="title" value={title}
             onChange={e => setTitle(e.target.value)} className={styles["form-input-modal"]} />
           </div>
           <div className={styles["form-group-modal"]}>
            <label htmlFor="description" className={styles.label}>Descrição:</label>
            <input type="text" name="description" id="description"
             value={description} onChange={e => setDescription(e.target.value)} className={styles["form-input-modal"]} />
           </div>
            <div className={styles["form-group-modal-flex"]}>
              <button className={styles["button-modal"]} onClick={handleCloseModal}>Fechar</button>
              <button className={styles["button-modal-success"]} onClick={()=>savaEdit()}>Salvar</button>
            </div>
            
          </div>
        </div>
        </div>
    )
}