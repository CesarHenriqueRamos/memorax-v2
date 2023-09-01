import {  useState } from "react";
import { useAuthGoogle } from "../../hooks/authGoogle";
import { Save } from "../../functions/functions";
import { getFirestore } from "@firebase/firestore";
import { app } from "../../services/firebaseConfig";
import { ModalNotification } from "../../components/ModalNotification";
import styles from './Create.module.css'
import { Header } from "../../components/Header";

export const Create = () => {
  const {user} = useAuthGoogle();
  const db = getFirestore(app);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalCreate, setModalCreate] = useState(false);

  const SaveItem = () =>{
    
    const infoUser = {
      email:user.email,
      name: user.displayName
    }
    const response = Save(db,title,description,infoUser);
     if(response){
      setModalCreate(true)
       setTitle("");
       setDescription("")
     }
  }
  
    return (
      <div className={styles.container}>

      <Header nameLink="Lista" link="/home" />
      
      <div className={styles['container-box']}>
        <div className={styles.box}>
          <div className={styles.form}>
            <div className={styles["form-group"]}>
              <label htmlFor="title">Titulo:</label>
              <input type="text" name="title" id="title" className={styles["input-form"]} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="description">Descrição:</label>
              <textarea name="description" id="description"  rows="10" className={styles["textarea-form"]} value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className={styles["form-group"]}>
              <div className={styles["container-form"]}>
                <button className={styles["button-form"]} onClick={SaveItem}>Salvar</button>
              </div>              
            </div>        
          </div>
        </div>
        </div>
        {modalCreate && 
          <ModalNotification title="Item Cadastrado com sucesso"
          handleCloseModalNotification={setModalCreate} />
       }
    </div> 
    
    )
  }