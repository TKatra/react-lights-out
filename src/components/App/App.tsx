import React from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';
import { GridHelper } from '../../Shared/Interfaces/gridHelper';
import Modal from '../Modal/Modal';
import { MiscHelper } from '../../Shared/miscHelper';
import Header from '../Header/Header';
import { Coordinate } from '../../Shared/Interfaces/coordinate';

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
      statistics: {
        timeSpent: false,
        turnList: []
      },
      phase: Phase.Setup,
      initialGrid: [],
      activeGrid: [],
      isGridValid: false,
      showtimer: false,
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
      showtimer: true,
      statistics: {
        timeSpent: false,
        turnList: []
      },
    });
  }

  updateGrid = (coordinate: Coordinate) => {
    const newGrid = GridHelper.setGridLights(this.state.activeGrid, coordinate);
    const isGridValid = GridHelper.isGridLightValid(newGrid);
    const newTurnList = MiscHelper.deepCopy(this.state.statistics.turnList) as Coordinate[];
    newTurnList.push(coordinate);

    this.setState({
      activeGrid: newGrid,
      isGridValid: isGridValid,
      phase: isGridValid ? Phase.GameOver : Phase.Play,
      statistics: {
        ...this.state.statistics,
        turnList: newTurnList
      }
    });
  }

  startNewGameSetup = () => {
    this.setState({
      phase: Phase.Setup,
      showtimer: false
    });
  }

  restartGameWithLatestGrid = () => {
    this.setState({
      activeGrid: MiscHelper.deepCopy(this.state.initialGrid),
      isGridValid: false,
      phase: Phase.Play,
      statistics: {
        timeSpent: false,
        turnList: []
      },
    });
  }

  render() {
    return (
      <div className="App">
        <Header showTimer={this.state.showtimer} />
        <div className='main-content pt-5 px-3'>

          { this.state.activeGrid.length ?
            <GamePlay setup={this.state.setup}
                      grid={this.state.activeGrid}
                      isGridValid={this.state.isGridValid}
                      onGridClick={this.updateGrid} />
            : null
          }
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

        <Modal title='Congratulations!'
                show={this.state.phase === Phase.GameOver}
                description='You won, press the button to start a new game again.'
                closable={false}
                primaryBtnText='Start New Game!'
                onPrimaryBtnClick={() => this.startNewGameSetup()}
                secondaryBtnText='Reset same game'
                onSecondaryBtnClick={() => this.restartGameWithLatestGrid()}>
        </Modal>
      </div>
    );
  }
}

export default App;
