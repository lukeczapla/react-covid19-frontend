import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
//import ReactDOM from 'react-dom';

import Game from './components/Game/Game.jsx';
import Simulation from './components/Simulation/Simulation.jsx';

import PersonList from './components/PersonList/PersonList';
import CaseList from './components/CaseList/CaseList';
import CaseForm from './components/CaseForm/CaseForm';
import PersonInfo from './components/PersonInfo/PersonInfo';
import PlotStatistics from './components/PlotStatistics/PlotStatistics';
import Reporting from './components/Reporting/Reporting';
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
    this.setState({
      [name]: value
    });
    if (name === 'personList1') {
        if (value == 0) this.setState({personInfo: null});
        else {
            let person = this.state.people.filter(person => person.id == value)[0];
            this.setState({
                personInfo: person
            });
        }
    }
    if (name === 'caseList1') {
        if (value == 0) this.setState({personInfo: null});
        else {
            let ccase = this.state.cases.filter(ccase => ccase.id == value)[0];
            let person = this.state.people.filter(person => person.id === ccase.primaryStudent.id)[0];
            this.setState({
                personInfo: person
            });
        }
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
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} width="200" height="200" className="App-logo" alt="logo" />
            <p>
              COVID Tracking and Simulation Demo
            </p>
            <Login onLoad={this.loadFunction} onEmpty={this.emptyFunction} />
            {this.state.profile === null ? <div>Not logged in</div> : <div>Logged in</div>}
            {this.state.profile !== null ? <HelloDialog name={this.state.profile.givenName} picture={this.state.profile.imageUrl}/>: null}
          </header>
          <div className='App-body'>
          <b>Find Person Information by name or by case</b><br/>
          {this.state.profile !== null ? <PersonList defaultEmpty='--- SELECT A PERSON ---' name="personList1" value={this.state.personList1} onFetch={this.loadPeople} onChange={this.inputChanged} v={this.state.v}/> : null}
          {this.state.profile !== null ? <CaseList defaultEmpty='--- SELECT A CASE ---' name="caseList1" onFetch={this.loadCases} onChange={this.inputChanged} v={this.state.v}/> : null}
          <br/><PersonInfo name="PersonInfo" person={this.state.personInfo} cases={this.state.cases}/>
          <button onClick={this.refresh}>Refresh Data</button>
          {this.state.people.length > 0 ? <CaseForm addName={this.addName} cases={this.state.cases} onSubmit={this.refresh} people={this.state.people} />: null}
          <PlotStatistics cases={this.state.cases}/>
          <Reporting/>
          <br/><br/>
          <hr/>
          <h4>Pandemic Simulation Demo</h4>
          <Simulation/>
          <hr/>
          <p>How about a nice game of tic-tac-toe?</p>
          <Game/>
          </div>
          <footer>Luke Czapla</footer>
        </div>
      );
  }

}


export default App;
