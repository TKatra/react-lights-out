import { GameOverProps } from '../../Shared/Interfaces/Props/gameOverProps';
import styles from './GameOver.module.scss';

function GameOver (props: GameOverProps) {
  return (
    <div className={`container ${styles.GameOver} ${props.show ? styles.show : ''}`}>
      <div className='row text-center'>
        <h2>Congratulations!</h2>
        <p>
          {`You won, press the button to start a new game again. Your time was: ${props.timerStringMs} in ${props.moveList.length} moves.`}
        </p>
      </div>

      <div className='d-flex justify-content-end mt-4'>
        <button className='btn btn-primary ms-3'
                onClick={() => props.onStartNewGame()}>
          Start New Game!
        </button>
        <button className='btn btn-secondary ms-3'
                onClick={() => props.onResetGame()}>
          Reset same game
        </button>
      </div>
    </div>
  );
}

export default GameOver;
