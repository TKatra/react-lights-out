import { Coordinate } from '../../Shared/Interfaces/coordinate';
import { GamePlayProps } from '../../Shared/Interfaces/Props/gamePlayProps';
import styles from './GamePlay.module.scss';

function GamePlay (props: GamePlayProps) {
  const onGridClick = (coordinate: Coordinate) => {
    if (!props.isGridValid) {
      props.onGridClick(coordinate);
    }
  }

  return (
    <div className={`${styles.PlayArea} mt-3`}>
      {props.grid.map((y, yIndex) => {
        return <div className='d-flex justify-content-center noselect' key={yIndex}> {
          y.map((x, xIndex) => {
            return <div className={`${styles.Square} ${ x ? styles.active : '' } m-1`}
                        onClick={() => onGridClick({x: xIndex, y: yIndex})}
                        key={xIndex}>
            </div>
        })}</div>
      })}
    </div>
  );
}

export default GamePlay;
