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
import { initialTimerState, timerReducer } from '../../Reducers/timerReducer';
import { TimerActionType } from '../../Shared/Enum/Actions/TimerActionType';
import { useInterval } from '../../Custom Hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../Custom Hooks/stateHooks';
import { resetGrid, selectActiveGrid, selectIsGridValid, selectMoveList, startNewGrid, updateGrid } from '../../Reducers/gridSlice';

function App () {
  const [phase, setPhase] = useState<Phase>(Phase.Setup)
  const [setupState, setupDispatch] = useReducer(setupReducer, initialSetupState);
  const [timerState, timerDispatch] = useReducer(timerReducer, initialTimerState);

  const dispatch = useAppDispatch();
  const activeGrid = useAppSelector(selectActiveGrid);
  const isGridValid = useAppSelector(selectIsGridValid);
  const moveList = useAppSelector(selectMoveList);

  const setPlayerName = (newName : string) => {
    setupDispatch({ type: SetupActionType.SetPlayerName, payload: newName });
  }

  const setPlayArea = (newPlayArea: PlayArea) => {
    setupDispatch({ type: SetupActionType.SetPlayArea, payload: newPlayArea });
  }

  const startGame = () => {
    const newGrid = GridHelper.CreateGrid(setupState.playArea.xLength, setupState.playArea.yLength);

    dispatch(startNewGrid(newGrid));

    setPhase(Phase.Play);
    startTimer();
  }

  const restartGameWithLatestGrid = () => {
    dispatch(resetGrid());
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

    dispatch(updateGrid({
      newGrid: newGrid,
      isGridValid: gridValid,
      newMoveList: newMoveList
    }));

    setPhase(gridValid ? Phase.GameOver : Phase.Play);
  }

  const startNewGameSetup = () => {
    timerDispatch({type: TimerActionType.HideTimer});
    setPhase(Phase.Setup);
  }

  const startTimer = () => {
    const startTime = Date.now();
    timerDispatch({type: TimerActionType.StartTimer, payload: startTime});
  }

  const stopTimer = () => {
    const endTime = Date.now();
    timerDispatch({type: TimerActionType.StopTimer, payload: endTime});
  }

  useInterval(() => {
    timerDispatch({type: TimerActionType.UpdateTimer, payload: Date.now()});
  }, timerState.active ? 1000 : null);

  return (
    <div className="App">
      <Header timer={timerState} />
      <div className='main-content pt-5 px-3'>

        { activeGrid.length &&
          <GamePlay setup={setupState}
                    grid={activeGrid}
                    isGridValid={isGridValid}
                    onGridClick={onUpdateGrid} />
        }
        <GameOver show={phase === Phase.GameOver}
                  timer={timerState}
                  moveList={moveList}
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
