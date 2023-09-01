import { Navigate } from 'react-router-dom';
import { useAuthGoogle } from '../../hooks/authGoogle';
import {FcGoogle} from 'react-icons/fc'
import styles from './Login.module.css';

export function Login(){
  const { signAuth, signed } = useAuthGoogle();

  async function login(){
    await signAuth();
  }

  if(!signed){
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>MemoraX</h1>
        </div>
        <div className={styles['container-header']}>
          <div className={styles['box-header']}>
            <h1>Login:</h1>
            <button className={styles['box-button-header']} onClick={() => login()}><FcGoogle size={20} /> Logar com o Google</button>
          </div>
        </div>
      </div> 
    )
  }else{
    return <Navigate to="/home" />
  }
  
    
  }