import React from 'react';
import { Phase } from '../../Shared/Enum/gamePhase';
import { Helpers } from '../../Shared/helpers';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import GamePlay from '../GamePlay/GamePlay';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';

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
      grid: []
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

  setGrid = (newGrid: boolean[][]) => {
    this.setState({
      grid: newGrid
    })
  }

  startGame = () => {
    const newGrid = Helpers.CreateGrid(this.state.setup.playArea.xLength, this.state.setup.playArea.yLength);

    this.setGrid(newGrid);
    this.setGamePhase(Phase.Play);
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
          <GamePlay setup={this.state.setup} grid={this.state.grid} />
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
