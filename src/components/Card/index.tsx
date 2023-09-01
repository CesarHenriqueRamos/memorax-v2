import { useAuthGoogle } from "../../hooks/authGoogle";
import { HiPencilAlt } from 'react-icons/hi';
import { ImBin2 } from 'react-icons/im';
import {AiOutlineCheck} from 'react-icons/ai';
import {GiPadlock, GiPadlockOpen} from 'react-icons/gi'
import styles from './Card.module.css';

interface CardProps {
  dataItem: {
    id: string;
    title: string;
    description: string;
    user_create: string;
    name_user_create: string
    block: boolean,
    finalize: boolean,
    name_finalize: string;
  }

  handleblockedItem: (id: string, block: boolean) => void;
  handlefinalizeItem: (id: string, block: boolean) => void;
  handleOpenModal: (block: boolean, title: string, description: string, id: string) => void;
  handledeleteItem: (id: string, block: boolean) => void;
}
export function Card({ dataItem,
  handleblockedItem, handlefinalizeItem, handleOpenModal, handledeleteItem
}: CardProps) {
  const { user } = useAuthGoogle();
  return (
    <div className={dataItem.finalize ? styles.finalise : styles.card} key={dataItem.id}  >
      <p className={styles['create-user']}>Criado por {dataItem.name_user_create}</p>
      <h4 className={styles.title}>{dataItem.title}</h4>
      <p className={styles.description}>{dataItem.description}</p>
      <div className={styles['card-buttons']}>
        {dataItem.finalize &&
          <>
            <div className={styles.responsible}>
              <p className={styles.responsible}>Responsavel: {dataItem.name_finalize}</p>
            </div>

          </>}
        {
          !dataItem.finalize &&
          <>


            {dataItem.user_create === user.email &&
              <>
                {
                  !dataItem.block ?
                    <button className={styles['button-block']} onClick={() => handleblockedItem(dataItem.id, dataItem.block)}><GiPadlockOpen color="#fff" size={15} /></button> :
                    <button className={styles['button-block']} onClick={() => handleblockedItem(dataItem.id, dataItem.block)}><GiPadlock color="#fff" size={15} /></button>
                }
              </>
            }
            {
              !dataItem.block ?
                <>
                  <button className={styles['button-finalisation']} onClick={() => handlefinalizeItem(dataItem.id, dataItem.block)}><AiOutlineCheck color="#fff" size={15} /></button>
                  <button className={styles['button-update']} onClick={() => handleOpenModal(dataItem.block, dataItem.title, dataItem.description, dataItem.id)}><HiPencilAlt color="#fff" size={15} /></button>
                </> : <></>
            }
          </>
        }
        {
          !dataItem.block ?
            <>

              <button className={styles['button-delete']} onClick={() => handledeleteItem(dataItem.id, dataItem.block)}><ImBin2 color="#fff" size={15} /></button>
            </> : <></>
        }
      </div>
    </div>
  )
}