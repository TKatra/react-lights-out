import React from 'react';
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
      }
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Lights Out!</h1>
        </header>

        <NewGameSetup gameSetup={this.state.gameSetup}
                      onPlayerNameChange={this.setPlayerName}
                      onPlayAreaChange={this.setPlayArea} />
      </div>
    );
  }
}

export default App;
