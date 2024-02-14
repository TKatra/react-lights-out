import { PlayAreaAngle } from '../../Shared/Enum/playAreaAngles';
import { MiscHelper } from '../../Shared/miscHelper';
import { NewGameSetupProps } from '../../Shared/Interfaces/Props/NewGameSetupProps';
import styles from './NewGameSetup.module.scss';

function NewGameSetup (props: NewGameSetupProps) {
  const minAreaLength = 3;
  const maxAreaLength = 10;

  const onPlayAreaChange = (inputValue: number, angle: PlayAreaAngle): void => {
    const updateValue = MiscHelper.NumberLimiter(inputValue, minAreaLength, maxAreaLength);

    if (angle === PlayAreaAngle.X) {
      props.onPlayAreaChange({ xLength: updateValue, yLength: props.playArea.yLength })
    }
    else {
      props.onPlayAreaChange({ xLength: props.playArea.xLength, yLength: updateValue })
    }
  }

  return (
    <>
      <label className='d-block mt-3'>Player Name</label>
      <input type="text"
              className='col-12'
              value={props.playerName}
              onChange={(e) => props.onPlayerNameChange(e.target.value)} />

      <label className='d-block mt-3'>Play Area Size</label>
      <div className='d-flex align-items-center'>
        <input type="number"
                className='col-5'
                min={minAreaLength}
                max={maxAreaLength}
                value={props.playArea.xLength}
                onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.X)} />
        <span className='col-2 text-center'>X</span>
        <input type="number"
                className='col-5'
                min={minAreaLength}
                max={maxAreaLength}
                value={props.playArea.yLength}
                onChange={(e) => onPlayAreaChange(parseInt(e.target.value), PlayAreaAngle.Y)} />
      </div>
    </>
  );
}

export default NewGameSetup;
