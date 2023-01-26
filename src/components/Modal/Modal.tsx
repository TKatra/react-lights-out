import { ModalProps } from '../../Shared/Interfaces/Props/modalProps';
import styles from './Modal.module.scss';

function Modal (props: ModalProps) {
  return (
    <div className={`${styles.Modal} ${props.show ? styles.show : ''} col-11 col-sm-6 col-md-4`} >
      <h2>{props.title}</h2>

      { props.description ?
        <p>{props.description}</p>
        : null
      }

      {props.children}

      <div className='d-flex justify-content-end mt-4'>
        { props.onPrimaryBtnClick ?
          <button className='btn btn-primary ms-3'
                  disabled={props.disablePrimaryBtn}
                  onClick={() => props.onPrimaryBtnClick?.()}>
            {props.primaryBtnText}
          </button>
          : null
        }
        { props.onSecondaryBtnClick ?
          <button className='btn btn-secondary ms-3'
                  disabled={props.disableSecondaryBtn}
                  onClick={() => props.onSecondaryBtnClick?.()}>
            {props.secondaryBtnText}
          </button>
          : null
        }
        { props.onClose && props.closable ?
          <button className='btn btn-secondary ms-3'
                  onClick={() => props.onClose?.()}>
            {props.closeBtnText}
          </button>
          : null
        }
      </div>
    </div>
  );
}

export default Modal;
