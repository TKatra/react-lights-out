import React from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';
import { GridHelper } from '../../Shared/Interfaces/gridHelper';

class App extends React.Component <{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      setup: {
        playerName: '',
        playArea: {
          xLength: 5,
          yLength: 5
        }
      },
      phase: Phase.Setup,
      initialGrid: [],
      activeGrid: [],
      isGridValid: false
    };
  }

  setPlayerName = (newName: string) => {
    this.setState({
      setup: {
        ...this.state.setup,
        playerName: newName
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

  startGame = () => {
    const newGrid = GridHelper.CreateGrid(this.state.setup.playArea.xLength, this.state.setup.playArea.yLength);

    this.setInitialGrid(newGrid);
    this.setActiveGrid(newGrid);
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
        { this.state.phase === Phase.Setup ?
          <NewGameSetup setup={this.state.setup}
                      onPlayerNameChange={this.setPlayerName}
                      onPlayAreaChange={this.setPlayArea}
                      onStartNewGame={this.startGame} />
          : null
        }

        { this.state.phase === Phase.Play ?
          <GamePlay setup={this.state.setup}
                    grid={this.state.activeGrid}
                    isGridValid={this.state.isGridValid}
                    onGridClick={this.updateGrid} />
          : null
        }

        { this.state.phase === Phase.GameOver ?
          <h2>Put Game Over screen here</h2>
          : null
        }
      </div>
    );
  }
}

export default App;
