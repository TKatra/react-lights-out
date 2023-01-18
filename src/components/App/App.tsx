import React from 'react';
import { GamePhase } from '../../Shared/Enum/gamePhase';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import NewGameSetup from '../NewGameSetup/NewGameSetup';
import './App.scss';

class App extends React.Component <{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gameSetup: {
        playerName: '',
        playArea: {
          xLength: 5,
          yLength: 5
        }
      },
      gamePhase: GamePhase.Setup
    };
  }

  setPlayerName = (newName: string) => {
    this.setState({
      gameSetup: {
        ...this.state.gameSetup,
        playerName: newName
      }
    });
  }

  setPlayArea = (newPlayArea: PlayArea) => {
    this.setState({
      gameSetup: {
        ...this.state.gameSetup,
        playArea: newPlayArea
      }
    });
  }

  setGamePhase = (newGamePhase: GamePhase) => {
    this.setState({
      gamePhase: newGamePhase
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lights Out!</h1>
        </header>
        { this.state.gamePhase === GamePhase.Setup ?
          <NewGameSetup gameSetup={this.state.gameSetup}
                      onPlayerNameChange={this.setPlayerName}
                      onPlayAreaChange={this.setPlayArea}
                      onStartNewGame={this.setGamePhase} />
          : null
        }

        { this.state.gamePhase === GamePhase.Play ?
          <h2>Put Game here</h2>
          : null
        }

        { this.state.gamePhase === GamePhase.GameOver ?
          <h2>Put Game Over screen here</h2>
          : null
        }
      </div>
    );
  }
}

export default App;
