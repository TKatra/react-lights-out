import React from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';
import { GridHelper } from '../../Shared/Interfaces/gridHelper';
import Modal from '../Modal/Modal';

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

  setPlayArea = (newPlayArea: PlayArea) => {
    this.setState({
      setup: {
        ...this.state.setup,
        playArea: newPlayArea
      }
    });
  }

  setSetupIsValid = (isValid: boolean) => {
    this.setState({
      setup: {
        ...this.state.setup,
        isValid: isValid
      }
    });
  }

  setGamePhase = (newGamePhase: Phase) => {
    this.setState({
      phase: newGamePhase
    });
  }

  setInitialGrid = (newGrid: boolean[][]) => {
    this.setState({
      initialGrid: newGrid
    })
  }

  setActiveGrid = (newGrid: boolean[][]) => {
    this.setState({
      activeGrid: newGrid
    })
  }

  setIsGridValid = (isValid: boolean) => {
    this.setState({
      isGridValid: isValid
    })
  }

  setPlayerName = (newName : string) => {
    this.setState({
      setup: {
        ...this.state.setup,
        playerName: newName
      }
    }, () => this.validateSetup());
  }

  validateSetup = () => {
    if (this.state.setup.playerName === '') {
      this.setSetupIsValid(false);
      return;
    }

    this.setSetupIsValid(true);
  }

  startGame = () => {
    const newGrid = GridHelper.CreateGrid(this.state.setup.playArea.xLength, this.state.setup.playArea.yLength);

    this.setInitialGrid(newGrid);
    this.setActiveGrid(newGrid);
    this.setIsGridValid(false);
    this.setGamePhase(Phase.Play);
  }

  updateGrid = (newGrid: boolean[][]) => {
    this.setActiveGrid(newGrid);
    this.setIsGridValid(GridHelper.isGridLightValid(newGrid));
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
                confirmBtnText='Start Game!'
                disableConfirmBtn={!this.state.setup.isValid}
                onConfirm={this.startGame}>
          <NewGameSetup setup={this.state.setup}
                        onPlayerNameChange={this.setPlayerName}
                        onPlayAreaChange={this.setPlayArea} />
        </Modal>

        <Modal title='Congratulations!'
                show={this.state.isGridValid && this.state.phase !== Phase.Setup}
                description='You won the, press the button to start a new game again.'
                closable={false}
                confirmBtnText='Start New Game!'
                onConfirm={() => this.setGamePhase(Phase.Setup)}>

        </Modal>
      </div>
    );
  }
}

export default App;
