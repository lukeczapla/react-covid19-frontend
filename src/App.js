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
          Welcome to the React frontend!
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          React homepage and documentation
        </a>
      </header>
      <div id="tic-tac-toe"></div>
      <body className="App-body">
        <HelloDialog name="Luke"></HelloDialog>
      </body>
      <footer>Luke Czapla</footer>
    </div>
  );
}

export default App;
