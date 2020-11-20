import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { GoogleLogin, GoogleLogout } from 'react-google-login';


class HelloDialog extends React.Component {
  render() {
    return (
      <div>Hello world {this.props.name}</div>
    );
  }
}

const Login = ({onLoad, onEmpty}) => {
    const [hideLogin, setHideLogin] = useState(false);
    const onSuccess = (user) => {
        console.log(user);
        ReactDOM.render(<div>Hello {user.profileObj.givenName}</div>, document.getElementById('msg'));
        setHideLogin(true);
        onLoad(user.profileObj);
    }, onLogoutSuccess = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('msg'));
        setHideLogin(false);
        onEmpty();
    };
    return (
        <div>
        {hideLogin?
          <GoogleLogout clientId="613395107842-nmr1dthih3c5ibcfcsrrkq61ef838ks8.apps.googleusercontent.com"
            buttonText="Logout" onLogoutSuccess={onLogoutSuccess}/>
          : <GoogleLogin clientId="613395107842-nmr1dthih3c5ibcfcsrrkq61ef838ks8.apps.googleusercontent.com"
            onSuccess={onSuccess} isSignedIn={true} />}
        </div>
    );
};


function App() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    document.title = (profile === null ? "Welcome" : "Welcome " + profile.givenName + " " + profile.familyName);
  });
  const callbackFunction = (data) => {
    setProfile(data);
  };
  const emptyFunction = () => {
    setProfile(null);
  };
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
        <Login onLoad={callbackFunction} onEmpty={emptyFunction} />
        {profile === null ? <div>Not logged in</div> : <div>Logged in</div>}
        <div id="msg"></div>
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
