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
      isGridValid: false
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
      initialGrid: GridHelper.deepCopyGrid(newGrid),
      activeGrid: GridHelper.deepCopyGrid(newGrid),
      isGridValid: false,
      phase: Phase.Play
    });
  }

  updateGrid = (newGrid: boolean[][]) => {
    const isGridValid = GridHelper.isGridLightValid(newGrid);

    this.setState({
      activeGrid: newGrid,
      isGridValid: isGridValid,
      phase: isGridValid ? Phase.GameOver : Phase.Play
    });
  }

  startNewGameSetup = () => {
    this.setState({
      phase: Phase.Setup
    });
  }

  restartGameWithLatestGrid = () => {
    this.setState({
      activeGrid: GridHelper.deepCopyGrid(this.state.initialGrid),
      isGridValid: false,
      phase: Phase.Play
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lights Out!</h1>
        </header>

        { this.state.activeGrid.length ?
          <GamePlay setup={this.state.setup}
                    grid={this.state.activeGrid}
                    isGridValid={this.state.isGridValid}
                    onGridClick={this.updateGrid} />
          : null
        }

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
