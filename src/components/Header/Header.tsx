import { HeaderProps } from '../../Shared/Interfaces/Props/headerProps';
import { MiscHelper } from '../../Shared/miscHelper';
import styles from './Header.module.scss';


function Header (props: HeaderProps) {
  return (
    <>
      <header className={`${styles.header}`}>
        <h1>Lights Out!</h1>
      </header>

      <div className={`${styles.timer} ${props.timer.show ? styles.show : ''} px-2 py-1`}>
        <i className="fa-regular fa-clock"></i>
        <span className='ms-2'>{MiscHelper.timerToString(props.timer.start, props.timer.end)}</span>
      </div>
    </>
  );
}

export default Header;
