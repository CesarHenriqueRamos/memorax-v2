import styles from './ModalNotification.module.css'
interface ModalPrpos{
    title:string;
    handleCloseModalNotification: (data:boolean) => void;
}

export function ModalNotification({title,handleCloseModalNotification}:ModalPrpos){
    return(
        <div className={styles["modal-overlay"]}>
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h2 className={styles["title-modal"]}>{title}</h2>
           
            <div className={styles["form-group-modal-flex"]}>
              <button className={styles["button-modal"]} onClick={()=>handleCloseModalNotification(false)}>Fechar</button>
            </div>
            
          </div>
        </div>
        </div>
    )
}