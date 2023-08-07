import { useAuthGoogle } from "../../hooks/authGoogle";
import './style.css'

interface CardProps{
    dataItem:{
        id:string;
        title:string;
        description:string;
        user_create: string;
        name_user_create: string
        block: boolean,
        finalize: boolean,
        name_finalize: string;
    }
    
    handleblockedItem:(id:string,block:boolean) => void;
    handlefinalizeItem:(id:string,block:boolean) => void;
    handleOpenModal:(block:boolean,title:string,description:string, id:string) => void;
    handledeleteItem:(id:string, block:boolean) => void;
}
export function Card({dataItem,
    handleblockedItem,handlefinalizeItem, handleOpenModal,handledeleteItem
}:CardProps){
        const {user} = useAuthGoogle();
        return(
            <div className={dataItem.finalize?"finalise card": "card"} key={dataItem.id}  >
                  <p className="create-user">Criado por {dataItem.name_user_create}</p>
                  <h4 className="title">{dataItem.title}</h4>
                  <p className="description">{dataItem.description}</p>
                  <div className="card-buttons">
                    {dataItem.finalize && 
                    <>
                    <div className="responsible">
                      <p className="responsible">Responsavel: {dataItem.name_finalize}</p>
                    </div>
                     
                    </> }
                    {
                     !dataItem.finalize && 
                     <>
                     
                    
                    {dataItem.user_create === user.email &&
                      <>
                        {
                        !dataItem.block ?
                        <button className="button button-block" onClick={() => handleblockedItem(dataItem.id,dataItem.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"/></svg></button> :
                        <button className="button button-block" onClick={() => handleblockedItem(dataItem.id,dataItem.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg></button>
                    }
                      </>
                    }
                    {
                      !dataItem.block ?
                      <>
                        <button className="button button-finalisation" onClick={() => handlefinalizeItem(dataItem.id,dataItem.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#fff"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></button>
                        <button className="button button-update" onClick={() => handleOpenModal(dataItem.block,dataItem.title,dataItem.description, dataItem.id)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#fff"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
                      </>:<></>
                    } 
                    </>
                  }
                  {
                      !dataItem.block ?
                      <>
  
                        <button className="button button-delete" onClick={() => handledeleteItem(dataItem.id, dataItem.block)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#fff" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                      </>:<></>
                    }
                   </div>
                </div>
        )
    }