import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
//import ReactDOM from 'react-dom';

import CurrencyField from './components/CurrencyField/CurrencyField';
import Game from './components/Game/Game.jsx';
import Simulation from './components/Simulation/Simulation.jsx';

import PersonList from './components/PersonList/PersonList';
import CaseList from './components/CaseList/CaseList';
import CaseForm from './components/CaseForm/CaseForm';
import PersonInfo from './components/PersonInfo/PersonInfo';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { ApiContext } from './api-context';

const HelloDialog = ({name, picture}) => {
    return (
      <div><img src={picture} alt="profile" width="25" height="25"/>Hello {name}</div>
    );
};

const Login = ({onLoad, onEmpty}) => {
    const [hideLogin, setHideLogin] = useState(false);
    const onSuccess = (user) => {
        //console.log(user);
        setHideLogin(true);
        onLoad(user);
    }, onLogoutSuccess = () => {
        setHideLogin(false);
        onEmpty();
    };
    return (
        <div>
        {hideLogin ?
          <GoogleLogout clientId="613395107842-nmr1dthih3c5ibcfcsrrkq61ef838ks8.apps.googleusercontent.com"
            buttonText="Logout" onLogoutSuccess={onLogoutSuccess}/> :
          <GoogleLogin clientId="613395107842-nmr1dthih3c5ibcfcsrrkq61ef838ks8.apps.googleusercontent.com"
            onSuccess={onSuccess} isSignedIn={true}/>}
        </div>
    );
};


class App extends Component {

  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
        profile: null,
        people: [],
        cases: [],
        v: 0,
        showClosed: false
    };
  }

  componentDidMount() {
    document.title = (this.state.profile === null ?
        "Welcome" : "Welcome " + this.state.profile.givenName + " " + this.state.profile.familyName);
  }

  componentWillUpdate() {
    document.title = (this.state.profile === null ?
        "Welcome" : "Welcome " + this.state.profile.givenName + " " + this.state.profile.familyName);
  }

  componentWillUnmount() {
    //ReactDOM.unmountComponentAtNode(document.getElementById('personlist1'));
    //ReactDOM.unmountComponentAtNode(document.getElementById('personlist2'));
    //ReactDOM.unmountComponentAtNode(document.getElementById('caselist1'));
    //ReactDOM.unmountComponentAtNode(document.getElementById('caselist2'));
  }

  inputChanged = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name);
    this.setState({
      [name]: value
    });
    if (name === 'personList1') {
        let person = this.state.people.filter(person => person.id === parseInt(value))[0];
        this.setState({
            personInfo: person
        });
    }
    if (name === 'caseList1') {
        let ccase = this.state.cases.filter(ccase => ccase.id === parseInt(value))[0];
        let person = this.state.people.filter(person => person.id === ccase.primaryStudent.id)[0];
        this.setState({
            personInfo: person
        });
    }
  }

  loadCases = (data) => {
    this.setState({cases: data});
  }

  loadPeople = (data) => {
    this.setState({people: data});
  }

  addName = (data) => {
    return this.state.profile.givenName + " " +this.state.profile.familyName;
  }

  loadFunction = (data) => {
    let user = {
        "email": data.profileObj.email,
        "firstName": data.profileObj.givenName,
        "lastName": data.profileObj.familyName,
        "socialId": data.profileObj.googleId,
        "tokenId" : data.tokenId
    };
    const {userlogin} = this.context;
    fetch(userlogin,
         {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          method: 'POST', credentials: 'include', body: JSON.stringify(user)})
    .then((info) => {
        console.log(info);
        this.setState({profile: data.profileObj});
    }).catch((error) => {
        console.log(error);
    });

  }

  emptyFunction = () => {
    const {userlogin} = this.context;
    fetch(userlogin, { method: 'DELETE' });
    this.setState({profile: null, cases: [], people: []});
  };

  refresh = () => {
    this.setState({
        v: this.state.v+1
    });
  }

  render() {
          console.log(this.context);

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
            <Login onLoad={this.loadFunction} onEmpty={this.emptyFunction} />
            {this.state.profile === null ? <div>Not logged in</div> : <div>Logged in</div>}
            {this.state.profile !== null ? <HelloDialog name={this.state.profile.givenName} picture={this.state.profile.imageUrl}/>: null}
          </header>
          {this.state.profile !== null ? <PersonList name="personList1" value={this.state.personList1} onFetch={this.loadPeople} onChange={this.inputChanged} v={this.state.v}/> : null}
          {this.state.profile !== null ? <CaseList name="caseList1" onFetch={this.loadCases} onChange={this.inputChanged} v={this.state.v}/> : null}
          <PersonInfo name="PersonInfo" person={this.state.personInfo} cases={this.state.cases}/>
          {this.state.people.length > 0 ? <PersonList name="personList2" value={this.state.personList2} people={this.state.people} onChange={this.inputChanged} /> : null}
          <button onClick={this.refresh}>Refresh Data</button>
          <label><input type="checkbox" id="showclosed" onChange={this.inputChanged} checked={this.state.showClosed} name="showClosed"/>Show closed cases
          {this.state.cases.length > 0 ? <CaseList name="caseSelect" value={this.state.caseSelect} showClosed={this.state.showClosed} onChange={this.inputChanged} cases={this.state.cases}/>: null}</label>
          {this.state.people.length > 0 ? <CaseForm addName={this.addName} cases={this.state.cases} people={this.state.people} />: null}

          <p>Pandemic Simulation Demo</p>
          <Simulation/>
          <hr/>
          <p>How about a nice game of tic-tac-toe?</p>
          <Game/>
          <div className="App-body">
            <CurrencyField/>
          </div>
          <footer>Luke Czapla</footer>
        </div>
      );
  }

}


export default App;
