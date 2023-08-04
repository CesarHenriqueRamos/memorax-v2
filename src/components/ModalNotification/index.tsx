
interface ModalPrpos{
    title:string;
    handleCloseModalNotification: (data:boolean) => void;
}

export function ModalNotification({title,handleCloseModalNotification}:ModalPrpos){
    return(
        <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h2 className="title-modal">{title}</h2>
           
            <div className="form-group-modal flex">
              <button className="button-modal" onClick={()=>handleCloseModalNotification(false)}>Fechar</button>
            </div>
            
          </div>
        </div>
        </div>
    )
}