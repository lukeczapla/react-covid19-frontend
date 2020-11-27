import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApiContext, configs} from './api-context';


ReactDOM.render(<ApiContext.Provider value={configs.testing}>
                  <App/>
                </ApiContext.Provider>, document.getElementById('root'));

// Analytics: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
reportWebVitals();
