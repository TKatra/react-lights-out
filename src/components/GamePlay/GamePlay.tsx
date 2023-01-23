import { Coordinate } from '../../Shared/Interfaces/coordinate';
import { GridHelper } from '../../Shared/Interfaces/gridHelper';
import { GamePlayProps } from '../../Shared/Interfaces/Props/gamePlayProps';
import styles from './GamePlay.module.scss';

function GamePlay (props: GamePlayProps) {

  const onGridClick = (coordinate: Coordinate) => {
    if (!props.isGridValid) {
      const newGrid = GridHelper.setGridLights(props.grid, coordinate);
      props.onGridClick(newGrid);
    }
  }

  return (
    <div className={`${styles.PlayArea} mt-5`}>
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
