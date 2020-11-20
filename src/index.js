import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './components/Game/Game.jsx';
import Simulation from './components/Simulation/Simulation.jsx';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Game/>, document.getElementById('tic-tac-toe'));
ReactDOM.render(<Simulation/>, document.getElementById('simulation'));

// Analytics: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
