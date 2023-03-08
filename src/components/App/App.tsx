import { useReducer, useState } from 'react';
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
import { initialSetupState, setupReducer } from '../../Reducers/setupReducer';
import { SetupActionType } from '../../Shared/Enum/Actions/SetupActionType';
import { gridReducer, initialGridState } from '../../Reducers/gridReducer';
import { GridActionType } from '../../Shared/Enum/Actions/GridActionType';
import { initialTimerState, timerReducer } from '../../Reducers/timerReducer';
import { TimerActionType } from '../../Shared/Enum/Actions/TimerActionType';

function App () {
  const [phase, setPhase] = useState<Phase>(Phase.Setup)
  const [setupState, setupDispatch] = useReducer(setupReducer, initialSetupState);
  const [gridState, gridDispatch] = useReducer(gridReducer, initialGridState);
  const [timerState, timerDispatch] = useReducer(timerReducer, initialTimerState);

  const setPlayerName = (newName : string) => {
    setupDispatch({ type: SetupActionType.SetPlayerName, payload: newName });
  }

  const setPlayArea = (newPlayArea: PlayArea) => {
    setupDispatch({ type: SetupActionType.SetPlayArea, payload: newPlayArea });
  }

  const startGame = () => {
    const newGrid = GridHelper.CreateGrid(setupState.playArea.xLength, setupState.playArea.yLength);

    gridDispatch({ type: GridActionType.StartNewGrid, payload: newGrid });
    setPhase(Phase.Play);
    startTimer();
  }

  const restartGameWithLatestGrid = () => {
    gridDispatch({ type: GridActionType.ResetGrid });
    setPhase(Phase.Play);
    startTimer();
  }

  const updateGrid = (coordinate: Coordinate) => {
    const newGrid = GridHelper.setGridLights(gridState.activeGrid, coordinate);
    const isGridValid = GridHelper.isGridLightValid(newGrid);

    if (isGridValid) {
      stopTimer();
    }

    const newMoveList = MiscHelper.deepCopy(gridState.moveList) as Coordinate[];
    newMoveList.push(coordinate);

    gridDispatch({
      type: GridActionType.UpdateGrid,
      payload: {
        newGrid: newGrid,
        isGridValid: isGridValid,
        newMoveList: newMoveList
    }});

    setPhase(isGridValid ? Phase.GameOver : Phase.Play);
  }

  const startNewGameSetup = () => {
    timerDispatch({type: TimerActionType.HideTimer});
    setPhase(Phase.Setup);
  }

  const startTimer = () => {
    const startTime = Date.now();

    timerDispatch({type: TimerActionType.StartTimer, payload: startTime});

    const timerId = setInterval(() => {
      if (timerState.active) {
        timerDispatch({type: TimerActionType.UpdateTimer, payload: Date.now()});
      }
    }, 1000);

    timerDispatch({type: TimerActionType.SetTimerId, payload: timerId});
  }

  const stopTimer = () => {
    const endTime = Date.now();

    clearInterval(timerState.id);
    timerDispatch({type: TimerActionType.StopTimer, payload: endTime});
  }

  return (
    <div className="App">
      <Header timer={timerState} />
      <div className='main-content pt-5 px-3'>

        { gridState.activeGrid.length ?
          <GamePlay setup={setupState}
                    grid={gridState.activeGrid}
                    isGridValid={gridState.isGridValid}
                    onGridClick={updateGrid} />
          : null
        }
        <GameOver show={phase === Phase.GameOver}
                  timer={timerState}
                  moveList={gridState.moveList}
                  onStartNewGame={() => startNewGameSetup()}
                  onResetGame={() => restartGameWithLatestGrid()} />
      </div>

      <Modal title='New Game'
              show={phase === Phase.Setup}
              closable={false}
              primaryBtnText='Start Game!'
              disablePrimaryBtn={!setupState.isValid}
              onPrimaryBtnClick={startGame}>
        <NewGameSetup setup={setupState}
                      onPlayerNameChange={setPlayerName}
                      onPlayAreaChange={setPlayArea} />
      </Modal>
    </div>
  );
}

export default App;
