import React from 'react';
import { PlayArea } from '../../Shared/Interfaces/playArea';
import { AppState } from '../../Shared/Interfaces/State/appState';
import StartNewGame from '../StartNewGame/StartNewGame';
import './App.scss';

class App extends React.Component <{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gameState: {
        playerName: '',
        playArea: {
          xLength: 5,
          yLength: 5
        }
      }
    };
  }

  setPlayerName = (newName: string) => {
    this.setState({
      gameState: {
        ...this.state.gameState,
        playerName: newName
      }
    });
  }

  setPlayArea = (newPlayArea: PlayArea) => {
    this.setState({
      gameState: {
        ...this.state.gameState,
        playArea: newPlayArea
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lights Out!</h1>
        </header>

        <StartNewGame gameState={this.state.gameState}
                      onPlayerNameChange={this.setPlayerName}
                      onPlayAreaChange={this.setPlayArea} />
      </div>
    );
  }
}

export default App;
