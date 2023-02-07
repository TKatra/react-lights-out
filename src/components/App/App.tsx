import React from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';
import { GridHelper } from '../../Shared/gridHelper';
import Modal from '../Modal/Modal';
import { MiscHelper } from '../../Shared/miscHelper';
import Header from '../Header/Header';
import { Coordinate } from '../../Shared/Interfaces/coordinate';
import GameOver from '../GameOver/GameOver';

class App extends React.Component <{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      setup: {
        playerName: '',
        playArea: {
          xLength: 3,
          yLength: 3
        },
        isValid: false
      },
      phase: Phase.Setup,
      initialGrid: [],
      activeGrid: [],
      isGridValid: false,
      timer: {
        active: false,
        show: false,
        start: 0,
        end: 0
      },
      moveList: []
    };
  }

  setPlayerName = (newName : string) => {
    this.setState({
      setup: {
        ...this.state.setup,
        playerName: newName,
        isValid: MiscHelper.validateSetup(this.state.setup)
      }
    });
  }

  setPlayArea = (newPlayArea: PlayArea) => {
    this.setState({
      setup: {
        ...this.state.setup,
        playArea: newPlayArea
      }
    });
  }

  startGame = () => {
    const newGrid = GridHelper.CreateGrid(this.state.setup.playArea.xLength, this.state.setup.playArea.yLength);

    this.setState({
      initialGrid: MiscHelper.deepCopy(newGrid),
      activeGrid: MiscHelper.deepCopy(newGrid),
      isGridValid: false,
      phase: Phase.Play,
      moveList: []
    });

    this.startTimer();
  }

  restartGameWithLatestGrid = () => {
    this.setState({
      activeGrid: MiscHelper.deepCopy(this.state.initialGrid),
      isGridValid: false,
      phase: Phase.Play,
      moveList: []
    });

    this.startTimer();
  }

  updateGrid = (coordinate: Coordinate) => {
    const newGrid = GridHelper.setGridLights(this.state.activeGrid, coordinate);
    const isGridValid = GridHelper.isGridLightValid(newGrid);

    if (isGridValid) {
      clearInterval(this.state.timer.id);
    }

    const newTurnList = MiscHelper.deepCopy(this.state.moveList) as Coordinate[];
    newTurnList.push(coordinate);

    this.setState({
      activeGrid: newGrid,
      isGridValid: isGridValid,
      phase: isGridValid ? Phase.GameOver : Phase.Play,
      moveList: newTurnList
    });
  }

  startNewGameSetup = () => {
    this.setState({
      phase: Phase.Setup,
      timer: {
        ...this.state.timer,
        show: false
      }
    });
  }

  startTimer = () => {
    const startTime = Date.now();

    this.setState({
      timer: {
        show: true,
        active: true,
        start: startTime,
        end: startTime
      }
    }, () => {
      const timerId = setInterval(() => {
        if (this.state.timer.active) {
          this.setState({
            timer: {
              ...this.state.timer,
              end: Date.now()
            }
          });
        }
      }, 1000);

      this.setState({
        timer: {
          ...this.state.timer,
          id: timerId
        }
      });
    });
  }

  stopTimer = () => {
    const endTime = Date.now();
    clearInterval(this.state.timer.id);

    this.setState({
      timer: {
        ...this.state.timer,
        active: false,
        end: endTime
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header timer={this.state.timer} />
        <div className='main-content pt-5 px-3'>

          { this.state.activeGrid.length ?
            <GamePlay setup={this.state.setup}
                      grid={this.state.activeGrid}
                      isGridValid={this.state.isGridValid}
                      onGridClick={this.updateGrid} />
            : null
          }
          <GameOver show={this.state.phase === Phase.GameOver}
                    timer={this.state.timer}
                    moveList={this.state.moveList}
                    onStartNewGame={() => this.startNewGameSetup()}
                    onResetGame={() => this.restartGameWithLatestGrid()} />
        </div>

        <Modal title='New Game'
                show={this.state.phase === Phase.Setup}
                closable={false}
                primaryBtnText='Start Game!'
                disablePrimaryBtn={!this.state.setup.isValid}
                onPrimaryBtnClick={this.startGame}>
          <NewGameSetup setup={this.state.setup}
                        onPlayerNameChange={this.setPlayerName}
                        onPlayAreaChange={this.setPlayArea} />
        </Modal>
      </div>
    );
  }
}

export default App;
