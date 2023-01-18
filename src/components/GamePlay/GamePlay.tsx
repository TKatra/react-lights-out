import { GamePlayProps } from '../../Shared/Interfaces/Props/gamePlayProps';
import styles from './GamePlay.module.scss';

function GamePlay (props: GamePlayProps) {

  return (
    <>
      <h2 className={`${styles.TEST} text-center`}>GamePlay!</h2>
      {props.grid.map((y, yIndex) => {
        return <p className='m-0 text-center' key={yIndex}> {
          y.map((x, xIndex) => {
            return <span key={xIndex}>X</span>
        })}</p>
      })}
    </>
  );
}

export default GamePlay;
