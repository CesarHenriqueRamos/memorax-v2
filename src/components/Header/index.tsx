import { Link } from "react-router-dom";
import { useAuthGoogle } from "../../hooks/authGoogle";
import styles from './styles.module.scss'

interface HeaderProps{
    nameLink:string;
    link:string;
}
export function Header({nameLink,link}:HeaderProps){
    const {signOut} = useAuthGoogle();
    return(
        <div className={styles.header}>
        <h1>MemoraX</h1>
        <ul>
          <li><Link to={link}>{nameLink}</Link></li>
          <li><button onClick={signOut} className="close">Sair</button></li>
        </ul>
      </div>
    )
}