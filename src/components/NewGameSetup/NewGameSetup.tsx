import { PlayAreaAngle } from '../../Shared/Enum/playAreaAngles';
import { MiscHelper } from '../../Shared/miscHelper';
import { NewGameSetupProps } from '../../Shared/Interfaces/Props/newGameSetupProps';
import styles from './NewGameSetup.module.scss';

function NewGameSetup (props: NewGameSetupProps) {
  const minAreaLength = 3;
  const maxAreaLength = 10;

  const onPlayAreaChange = (inputValue: number, angle: PlayAreaAngle): void => {
    const updateValue = MiscHelper.NumberLimiter(inputValue, minAreaLength, maxAreaLength);

    if (angle === PlayAreaAngle.X) {
      props.onPlayAreaChange({ xLength: updateValue, yLength: props.setup.playArea.yLength })
    }
    else {
      props.onPlayAreaChange({ xLength: props.setup.playArea.xLength, yLength: updateValue })
    }
  }

  const isSetupValid = (): boolean => {
    if (props.setup.playerName === '') return false;

    return true;
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className={`${styles.StartNewGame} col-sm-6 col-md-4 mt-5 p-3`}>
          <h2>New Game</h2>

          <label className='d-block mt-3'>Player Name</label>
          <input type="text"
                  className='col-12'
                  value={props.setup.playerName}
                  onChange={(e) => props.onPlayerNameChange(e.target.value)} />

          <label className='d-block mt-3'>Play Area Size</label>
          <div className='d-flex align-items-center'>
            <input type="number"
                    className='col-5'
                    min={minAreaLength}
                    max={maxAreaLength}
                    value={props.setup.playArea.xLength}
                    onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.X)} />
            <span className='col-2 text-center'>X</span>
            <input type="number"
                    className='col-5'
                    min={minAreaLength}
                    max={maxAreaLength}
                    value={props.setup.playArea.yLength}
                    onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.Y)} />
          </div>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary mt-3'
                    disabled={!isSetupValid()}
                    onClick={() => props.onStartNewGame()}>
              Start Game!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewGameSetup;
