import { PlayAreaAngle } from '../../Shared/Enum/playAreaAngles';
import { startNewGameProps } from '../../Shared/Interfaces/Props/startNewGameProps';
import styles from './StartNewGame.module.scss';

function StartNewGame (props: startNewGameProps) {
  const minAreaLength = 3;

  const onPlayAreaChange = (inputValue: number, angle: PlayAreaAngle) => {
    const updateValue = inputValue < minAreaLength ? minAreaLength : inputValue;

    if (angle === PlayAreaAngle.X) {
      props.onPlayAreaChange({ xLength: updateValue, yLength: props.gameSetup.playArea.yLength })
    }
    else {
      props.onPlayAreaChange({ xLength: props.gameSetup.playArea.xLength, yLength: updateValue })
    }
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className={`${styles.StartNewGame} col-sm-6 col-md-4 mt-5 p-3`}>
          <h2>New Game</h2>

          <label className='d-block mt-3'>Player Name</label>
          <input type="text"
                  className='col-12'
                  value={props.gameSetup.playerName}
                  onChange={(e) => props.onPlayerNameChange(e.target.value)} />

          <label className='d-block mt-3'>Play Area Size</label>
          <div className='d-flex align-items-center'>
            <input type="number"
                    className='col-5'
                    min={minAreaLength}
                    value={props.gameSetup.playArea.xLength}
                    onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.X)} />
            <span className='col-2 text-center'>X</span>
            <input type="number"
                    className='col-5'
                    min={minAreaLength}
                    value={props.gameSetup.playArea.yLength}
                    onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.Y)} />
          </div>

          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary mt-3'>Start Game!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartNewGame;
