import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.gameOver = false;
    this.state = {
      history: [
        {squares: Array(9).fill(null)}
      ],
      moveNumber: 0,
      xTurn: false
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.moveNumber+1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (this.gameOver || squares[i]) {
      // can't move here
      return;
    }
    squares[i] = this.state.xTurn ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      moveNumber: history.length,
      xTurn: !this.state.xTurn
    });
  }

  jumpTo(move) {
    this.setState({
      moveNumber: move,
      xTurn: (move % 2) === 1
    });
    this.gameOver = false;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const winner = (this.state.moveNumber < 5 ? null: calculateWinner(current.squares));

    const moves = history.map((step, move) => {
      const description = move ? 'Go to move #' + move: 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      this.gameOver = true;
      status = "Winner: " + winner;
    } else {
      if (this.state.moveNumber < 9) status = "Next player: " + (this.state.xTurn ? "X":"O");
      else status = "Tie Game";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <h2>Game States</h2>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<App/>, document.getElementById('root'));

ReactDOM.render(<Game/>, document.getElementById('tic-tac-toe'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
