import { HeaderProps } from '../../Shared/Interfaces/Props/headerProps';
import styles from './Header.module.scss';


function Header (props: HeaderProps) {
  return (
    <>
      <header className={`${styles.header}`}>
        <h1>Lights Out!</h1>
      </header>

      <div className={`${styles.timer} ${props.isTimerShown ? styles.show : ''} px-2 py-1`}>
        <i className="fa-regular fa-clock"></i>
        <span className='ms-2'>{props.timerString}</span>
      </div>
    </>
  );
}

export default Header;
