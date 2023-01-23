import { ModalProps } from '../../Shared/Interfaces/Props/modalProps';
import styles from './Modal.module.scss';

function Modal (props: ModalProps) {
  return (
    <div className={`${styles.Modal} ${props.show ? styles.show : ''}`} >
      <h2>{props.title}</h2>

      { props.description ?
        <p>{props.description}</p>
        : null
      }

      {props.children}

      <div className='d-flex justify-content-end mt-4'>
        { props.onConfirm ?
          <button className='btn btn-primary'
                  disabled={props.disableConfirmBtn}
                  onClick={() => props.onConfirm?.()}>
            {props.confirmBtnText}
          </button>
          : null
        }
        { props.onClose && props.closable ?
          <button className='btn btn-secondary'
                  onClick={() => props.onConfirm?.()}>
            {props.closeBtnText}
          </button>
          : null
        }
      </div>
    </div>
  );
}

export default Modal;
