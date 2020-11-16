import logo from './logo.svg';
import './App.css';
import React from 'react';


class HelloDialog extends React.Component {
  render() {
    return (
      <div>Hello world {this.props.name}</div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Simulation Demo
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Built with React
        </a>
      </header>
      <p>Infection Explorer</p>
      <div id="simulation"></div>
      <hr/>
      <p>How about a nice game of tic-tac-toe?</p>
      <div id="tic-tac-toe"></div>
      <div className="App-body">
        <HelloDialog name="Luke"></HelloDialog>
      </div>
      <footer>Luke Czapla</footer>
    </div>
  );
}

export default App;
