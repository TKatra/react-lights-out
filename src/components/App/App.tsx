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
import { useAppDispatch, useAppSelector } from '../../Custom Hooks/stateHooks';
import { resetGrid, selectActiveGrid, selectIsGridValid, selectMoveList, startNewGrid, updateGrid } from '../../Slices/gridSlice';
import { selectIsSetupValid, selectPlayArea, selectPlayerName, setPlayArea, setPlayerName } from '../../Slices/setupSlice';
import { hideTimer, selectIsTimerActive, selectIsTimerShown, selectTimerString, selectTimerStringIncludeMs, startTimer, stopTimer, updateTimer } from '../../Slices/timerSlice';

function App () {
  const [phase, setPhase] = useState<Phase>(Phase.Setup)

  const dispatch = useAppDispatch();

  const playerName = useAppSelector(selectPlayerName);
  const playArea = useAppSelector(selectPlayArea);
  const isSetupValid = useAppSelector(selectIsSetupValid);

  const activeGrid = useAppSelector(selectActiveGrid);
  const isGridValid = useAppSelector(selectIsGridValid);
  const moveList = useAppSelector(selectMoveList);

  const timerString = useAppSelector(selectTimerString);
  const timerStringIncludingMs = useAppSelector(selectTimerStringIncludeMs);
  const isTimerActive = useAppSelector(selectIsTimerActive);
  const isTimerShown = useAppSelector(selectIsTimerShown);

  const onSetPlayerName = (newName : string) => {
    dispatch(setPlayerName(newName));
  }

  const onSetPlayArea = (newPlayArea: PlayArea) => {
    dispatch(setPlayArea(newPlayArea));
  }

  const startGame = () => {
    const newGrid = GridHelper.CreateGrid(playArea.xLength, playArea.yLength);

    dispatch(startNewGrid(newGrid));

    setPhase(Phase.Play);
    onStartTimer();
  }

  const restartGameWithLatestGrid = () => {
    dispatch(resetGrid());
    setPhase(Phase.Play);
    onStartTimer();
  }

  const onUpdateGrid = (coordinate: Coordinate) => {
    const newGrid = GridHelper.setGridLights(MiscHelper.deepCopy(activeGrid), coordinate);
    const gridValid = GridHelper.isGridLightValid(newGrid);

    if (gridValid) {
      onStopTimer();
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
    dispatch(hideTimer());
    setPhase(Phase.Setup);
  }

  const onStartTimer = () => {
    const startTime = Date.now();
    dispatch(startTimer(startTime));
  }

  const onStopTimer = () => {
    const endTime = Date.now();
    dispatch(stopTimer(endTime));
  }

  useInterval(() => {
    dispatch(updateTimer(Date.now()));
  }, isTimerActive ? 1000 : null);

  return (
    <div className="App">
      <Header timerString={timerString}
              isTimerShown={isTimerShown} />
      <div className='main-content pt-5 px-3'>

        { !!activeGrid.length &&
          <GamePlay grid={activeGrid}
                    isGridValid={isGridValid}
                    onGridClick={onUpdateGrid} />
        }
        <GameOver show={phase === Phase.GameOver}
                  timerStringMs={timerStringIncludingMs}
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
                      onPlayerNameChange={onSetPlayerName}
                      onPlayAreaChange={onSetPlayArea} />
      </Modal>
    </div>
  );
}

export default App;
