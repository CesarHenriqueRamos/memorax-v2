import {  useState } from "react";
import { Link } from "react-router-dom";
import { useAuthGoogle } from "../../hooks/authGoogle";
import { Save } from "../../functions/functions";
import "./style.css"

export const Create = () => {
  const {user,signOut} = useAuthGoogle();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const SaveItem = () =>{
    const infoUser = {
      email:user.email,
      name: user.displayName
    }
    const response = Save(title,description,infoUser);
     if(response){
       alert("Cadastrado com sucesso")
       setTitle("");
       setDescription("")
     }
  }
  
    return (
      <div className='container'>
      <div className='header'>
        <h1>MemoraX</h1>
        <ul>
          <li><Link to="/home">Lista</Link></li>
          <li><button onClick={signOut} className="close">Sair</button></li>
        </ul>
      </div>
      <div className='container-box'>
        <div className='box'>
          <div className="form">
            <div className="form-group">
              <label htmlFor="title">Titulo:</label>
              <input type="text" name="title" id="title" className="input-form" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição:</label>
              <textarea name="description" id="description"  rows="10" className="textarea-form" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
            <div className="form-group">
              <div className="container-form">
                <button className="button-form" onClick={SaveItem}>Salvar</button>
              </div>              
            </div>        
          </div>
        </div>
        </div>
    </div> 
    
    )
  }