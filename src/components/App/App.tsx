import { useState } from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';
import { GridHelper } from '../../Shared/gridHelper';
import Modal from '../Modal/Modal';
import { MiscHelper } from '../../Shared/miscHelper';
import Header from '../Header/Header';
import { Coordinate } from '../../Shared/Interfaces/coordinate';
import GameOver from '../GameOver/GameOver';
import { useInterval } from '../../Custom Hooks/useInterval';
import { useBoundStore } from '../../Store/store';

function App () {
  const [phase, setPhase] = useState<Phase>(Phase.Setup)

  const {
    //Grid
    activeGrid,
    isGridValid,
    moveList,
    startNewGrid,
    resetGrid,
    updateGrid,
    // Setup
    playerName,
    playArea,
    isSetupValid,
    setPlayerName,
    setPlayArea,
    // Timer
    isTimerActive,
    isTimerShown,
    getTimerString,
    getTimerStringWithMs,
    startTimer,
    updateTimer,
    stopTimer,
    hideTimer,
  } = useBoundStore();


  const startGame = () => {
    const newGrid = GridHelper.CreateGrid(playArea.xLength, playArea.yLength);

    startNewGrid(newGrid);
    setPhase(Phase.Play);
    startTimer();
  }

  const restartGameWithLatestGrid = () => {
    resetGrid();
    setPhase(Phase.Play);
    startTimer();
  }

  const onUpdateGrid = (coordinate: Coordinate) => {
    const newGrid = GridHelper.setGridLights(MiscHelper.deepCopy(activeGrid), coordinate);
    const gridValid = GridHelper.isGridLightValid(newGrid);

    if (gridValid) {
      stopTimer();
    }

    const newMoveList = MiscHelper.deepCopy(moveList) as Coordinate[];
    newMoveList.push(coordinate);

    updateGrid(newGrid, gridValid, newMoveList);
    setPhase(gridValid ? Phase.GameOver : Phase.Play);
  }

  const startNewGameSetup = () => {
    hideTimer();
    setPhase(Phase.Setup);
  }

  useInterval(() => {
    updateTimer();
  }, isTimerActive ? 1000 : null);

  return (
    <div className="App">
      <Header timerString={getTimerString()}
              isTimerShown={isTimerShown} />
      <div className='main-content pt-5 px-3'>

        { !!activeGrid.length &&
          <GamePlay grid={activeGrid}
                    isGridValid={isGridValid}
                    onGridClick={onUpdateGrid} />
        }
        <GameOver show={phase === Phase.GameOver}
                  timerStringMs={getTimerStringWithMs()}
                  moveList={moveList}
                  onStartNewGame={() => startNewGameSetup()}
                  onResetGame={() => restartGameWithLatestGrid()} />
      </div>

      <Modal title='New Game'
              show={phase === Phase.Setup}
              closable={false}
              primaryBtnText='Start Game!'
              disablePrimaryBtn={!isSetupValid}
              onPrimaryBtnClick={startGame}>
        <NewGameSetup playerName={playerName}
                      playArea={playArea}
                      onPlayerNameChange={setPlayerName}
                      onPlayAreaChange={setPlayArea} />
      </Modal>
    </div>
  );
}

export default App;
