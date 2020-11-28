import React from 'react';
import './CaseForm.css';
import PersonList from '../PersonList/PersonList';
import CaseList from '../CaseList/CaseList';
import PersonInfo from '../PersonInfo/PersonInfo';
import SecondarySelect from '../SecondarySelect/SecondarySelect';
import {ApiContext} from '../../api-context';

class CaseForm extends React.Component {

  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
        disabled: false,
        secondaries: {},
        caseId: '',
        selectedOptions: [],
        secondaryAdded: [],
        secondarySelected: '',
        caseSelect: this.props.cases[0].id,
        showClosed: false,
        exposedClassOutside: false,
        exposedClassOutsideFirst: false,
        exposedClass: false,
        exposedClassFirst: false,
        exposedBus: false,
        exposedBusFirst: false,
        exposedCarpool: false,
        exposedOutside: false,

        preparedBy: '',
        primaryStudent: props.people[0].id,
        exposureType: 0,
        exposureType2: 0,
        exposureType3: 0,
        exposureDate: '',
        certainty: 0,
        contactReason: 1,
        epiHighRisk: 0,
        exposingStudent: '0',
        hasFever: false,
        hasCough: false,
        temperature: '',
        hasSymptoms: false,
        hasShortness: false,
        hasBreathing: false,
        hasLostSmell: false,
        hasLostTaste: false,
        hasChills: false,
        hasMyalgia: false,
        hasSoreThroat: false,
        hasRunnyNose: false,
        hasCongestion: false,
        hasNausea: false,
        hasVomiting: false,
        hasDiarrhea: false,
        hasHeadache: false,
        hasFatigue: false,
        testResult: 1,
        testResult2: 1,
        testResult3: 1,
        testDate: '',
        testDate2: '',
        testDate3: '',
        symptomDate: '',
        requiredDate: '',
        followup: false,
        followupDate: '',
        resolved: false,
        stayHome: false,
        doctorPermission: false,
        awaitingDocumentation: false,
        administrativeCase: false,
        notes: ''
    };
  }

  selectChanged = (e) => {
    console.log(e.target.selectedOptions);
    let value = Array.from(e.target.selectedOptions, option => option.value);
    console.log(value);
    this.setState({selectedOptions: value});
  }

  secondaryChanged = (e) => {
    let value = e.target.value;
    //console.log('changing value ' + value);
    if (this.state.secondarySelected !== '') {
        let s = {
            exposedClassOutside: this.state.exposedClassOutside,
            exposedClassOutsideFirst: this.state.exposedClassOutsideFirst,
            exposedClass: this.state.exposedClass,
            exposedClassFirst: this.state.exposedClassFirst,
            exposedBus: this.state.exposedBus,
            exposedBusFirst: this.state.exposedBusFirst,
            exposedOutside: this.state.exposedOutside,
            exposedCarpool: this.state.exposedCarpool
        }
        let secs = this.state.secondaries;
        secs[this.state.secondarySelected] = s;
        let s2 = this.state.secondaries[value];
        this.setState({
            exposedClassOutside: s2.exposedClassOutside,
            exposedClassOutsideFirst: s2.exposedClassOutsideFirst,
            exposedClass: s2.exposedClass,
            exposedClassFirst: s2.exposedClassFirst,
            exposedBus: s2.exposedBus,
            exposedBusFirst: s2.exposedBusFirst,
            exposedOutside: s2.exposedOutside,
            exposedCarpool: s2.exposedCarpool,
            secondaries: secs
        });
    }
    //console.log(this.state.secondaries);
    //console.log(this.state);
    this.setState({secondarySelected: value});
  }

  addSecondary = () => {
    this.state.secondaryAdded.push(...this.state.selectedOptions);
    let s = this.state.secondaries;
    this.state.selectedOptions.forEach(value => {
      s[value] = {
        exposedClassOutside: false,
        exposedClassOutsideFirst: false,
        exposedClass: false,
        exposedClassFirst: false,
        exposedBus: false,
        exposedBusFirst: false,
        exposedCarpool: false,
        exposedOutside: false
      }
    });
    this.setState({
        secondaryAdded: this.state.secondaryAdded,
        selectedOptions: [],
        secondaries: s
    });
    if (this.state.secondaryAdded.length > 0 && this.state.secondarySelected === '') {
        this.setState({secondarySelected: this.state.secondaryAdded[0]});
    }
  }

  removeSecondary = () => {
    //needed to use local variables because state is updated asynchronously
    if (this.state.secondarySelected === '') return;
    delete this.state.secondaries.[this.state.secondarySelected];
    let s = this.state.secondaryAdded.filter(value => value !== this.state.secondarySelected);
    this.setState({
        secondaryAdded: s
    });
    let v = (s.length === 0 ? '': s[0]);
    this.setState({
        secondarySelected: v
    });
    console.log(v);
    console.log(this.state.secondaries);
    if (v !== '') {
        let s = this.state.secondaries[v];
        this.setState({
            exposedClassOutside: s.exposedClassOutside,
            exposedClassOutsideFirst: s.exposedClassOutsideFirst,
            exposedClass: s.exposedClass,
            exposedClassFirst: s.exposedClassFirst,
            exposedBus: s.exposedBus,
            exposedBusFirst: s.exposedBusFirst,
            exposedOutside: s.exposedOutside,
            exposedCarpool: s.exposedCarpool,
        });
    }
  }

  exposedPropChanged = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
    // update the property in case the next action is a submit
    if (this.state.secondarySelected !== '') {
        let s = this.state.secondaries[this.state.secondarySelected];
        s.[name] = value;
    }
    //console.log(name + " " + value);
  }

  inputChanged = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
    if (name === 'administrativeCase' && value === true) {
      this.setState({resolved: true});
    }
    if (name === 'primaryStudent') this.setState({ personInfo: null })
    console.log(name + " " + value);
  }

  clearCaseData = () => {
    //console.log(this.state);
    this.setState({
        caseId : '',
        preparedBy: '',
        primaryStudent: this.props.people[0].id,
        exposureType: 0,
        exposureType2: 0,
        exposureType3: 0,
        exposureDate: '',
        certainty: 0,
        contactReason: 1,
        epiHighRisk: 0,
        exposingStudent: '0',
        hasFever: false,
        hasCough: false,
        temperature: '',
        hasSymptoms: false,
        hasShortness: false,
        hasBreathing: false,
        hasLostSmell: false,
        hasLostTaste: false,
        hasChills: false,
        hasMyalgia: false,
        hasSoreThroat: false,
        hasRunnyNose: false,
        hasCongestion: false,
        hasNausea: false,
        hasVomiting: false,
        hasDiarrhea: false,
        hasHeadache: false,
        hasFatigue: false,
        testResult: 1,
        testResult2: 1,
        testResult3: 1,
        testDate: '',
        testDate2: '',
        testDate3: '',
        symptomDate: '',
        requiredDate: '',
        followup: false,
        followupDate: '',
        resolved: false,
        stayHome: false,
        doctorPermission: false,
        awaitingDocumentation: false,
        administrativeCase: false,
        notes: ''
    });
  }

  deleteCase = () => {
    const {deletecase} = this.context;
    fetch(deletecase+this.state.caseSelect, { method: 'DELETE', credentials: 'include' })
    .then(response => response.text())
    .then(data => {
        if (this.props.onDelete) this.props.onDelete();
        alert('Deleted case ' + this.state.caseSelect);
    });
  }

  loadCase = () => {
    let ccase = this.props.cases.filter(c => c.id == this.state.caseSelect)[0];
    this.setState({
      caseId: ccase.id,
      preparedBy: ccase.preparedBy,
      primaryStudent: ccase.primaryStudent.id,
      exposureType: ccase.exposureType,
      exposureType2: (ccase.exposureType2 === null ? 0 : ccase.exposureType2),
      exposureType3: (ccase.exposureType3 === null ? 0 : ccase.exposureType3),
      certainty: ccase.certainty,
      contactReason: ccase.contactReason,
      epiHighRisk: ccase.epiHighRisk,
      exposingStudent: (ccase.exposingStudent === null ? 0 : ccase.exposingStudent.id),
      hasSymptoms: (ccase.hasSymptoms === true ? 1 : 2),
      hasFever: ccase.hasFever,
      hasCough: ccase.hasCough,
      temperature: (ccase.temperature === null ? '' : ccase.temperature),
      hasShortness: ccase.hasShortness,
      hasBreathing: ccase.hasBreathing,
      hasLostSmell: ccase.hasLostSmell,
      hasLostTaste: ccase.hasLostTaste,
      hasChills: ccase.hasChills,
      hasMyalgia: ccase.hasMyalgia,
      hasSoreThroat: ccase.hasSoreThroat,
      hasRunnyNose: ccase.hasRunnyNose,
      hasCongestion: ccase.hasCongestion,
      hasNausea: ccase.hasNausea,
      hasVomiting: ccase.hasVomiting,
      hasDiarrhea: ccase.hasDiarrhea,
      hasHeadache: ccase.hasHeadache,
      hasFatigue: ccase.hasFatigue,
      testResult: ccase.testResult,
      testResult2: (ccase.testResult2 === null ? 1: ccase.testResult2),
      testResult3: (ccase.testResult3 === null ? 1: ccase.testResult3),
      testDate: (ccase.testDate === null ? '' : new Date(ccase.testDate).toISOString().slice(0,10)),
      testDate2: (ccase.testDate2 === null ? '' : new Date(ccase.testDate2).toISOString().slice(0,10)),
      testDate3: (ccase.testDate3 === null ? '' : new Date(ccase.testDate3).toISOString().slice(0,10)),
      symptomDate: (ccase.symptomDate === null ? '' : new Date(ccase.symptomDate).toISOString().slice(0,10)),
      exposureDate: (ccase.exposureDate === null ? '' : new Date(ccase.exposureDate).toISOString().slice(0,10)),
      requiredDate: (ccase.requiredDate === null ? '' : new Date(ccase.requiredDate).toISOString().slice(0,10)),
      followup: ccase.followup,
      followupDate: (ccase.followupDate === null ? '' : new Date(ccase.followupDate).toISOString().slice(0,10)),
      resolved: ccase.resolved,
      stayHome: ccase.stayHome,
      doctorPermission: ccase.doctorPermission,
      awaitingDocumentation: ccase.awaitingDocumentation,
      administrativeCase: ccase.administrativeCase,
      notes: ccase.notes
    });
    //console.log(ccase);
  }

  updateInfo = () => {
    let person = this.props.people.filter(person => person.id == this.state.primaryStudent)[0];
    this.setState({
        personInfo: person
    });
  }

  addName = (e) => {
    //console.log(e.target);
    //console.log(e.target.name);
    if (this.props.addName !== undefined) {
      let name = this.props.addName(e);
      if (this.state.preparedBy === '' || this.state.caseId === '') this.setState({preparedBy: name});
      else this.setState({preparedBy: this.state.preparedBy + ', ' + name});
    }
  }

  submitCase = (e) => {
    if (this.state.disabled) return;
    if (this.state.caseId !== '') {
        alert("Do you mean to update an existing case?");
        return;
    }
    if (this.state.hasSymptoms === false) {
        alert("You must select either Has Symptoms or Has No Symptoms");
        return;
    }
    if (this.state.requiredDate === '') {
        alert('You must set Date of Required Evaluation');
        return;
    }
    if (this.state.certainty == 0) {
        alert('You must set a Certainty of COVID-19 Disease');
        return;
    }
    if (this.state.preparedBy === '') {
        alert('You must set the Prepared By Name');
        return;
    }
    if (this.state.followup === true && this.state.followupDate === '') {
        alert('You must set a Followup Date');
        return;
    }
    if (this.state.exposureType == 0) {
        alert('You must set the Exposure Type or select No Exposure in the first exposure field');
        return;
    }
    this.setState({disabled: true});
    let data = {...this.state};
    data.primaryStudent = {id: data.primaryStudent};
    if (data.exposingStudent !== '0') {
        data.exposingStudent = {id: data.exposingStudent};
    } else delete data.exposingStudent;
    delete data.personInfo;
    delete data.caseId;
    delete data.caseSelect;
    delete data.showClosed;
    delete data.disabled;
    data.hasSymptoms = (data.hasSymptoms === '1' ? true:false);

    console.log(data);
    const {addcase} = this.context;
    fetch(addcase, {
        headers: {
                  'Content-Type': 'application/json'
                 },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(info => {
        alert('Your case has been submitted and its case number is ' + info);
        this.setState({disabled: false, caseSelect: info});
        this.clearCaseData();
        if (this.props.onSubmit) this.props.onSubmit();
    }).catch((error) => {
        alert('Submission failed, check that you are logged into the system');
        this.setState({disabled: false});
    });
  }

  updateCase = (e) => {
    if (this.state.disabled) return;
    if (this.state.caseId === '') {
        alert('Do you mean to submit this as a new case?');
        return;
    }
    if (this.state.hasSymptoms === false) {
        alert("You must select either Has Symptoms or Has No Symptoms");
        return;
    }
    if (this.state.requiredDate === '') {
        alert('You must set Date of Required Evaluation');
        return;
    }
    if (this.state.certainty == 0) {
        alert('You must set a Certainty of COVID-19 Disease');
        return;
    }
    if (this.state.preparedBy === '') {
        alert('You must set the Prepared By Name');
        return;
    }
    if (this.state.followup === true && this.state.followupDate === '') {
        alert('You must set a Followup Date');
        return;
    }
    if (this.state.exposureType == 0) {
        alert('You must set the Exposure Type or select No Exposure in the first exposure field');
        return;
    }
    this.setState({disabled: true});
    let data = {...this.state};
    data.primaryStudent = {id: data.primaryStudent};
    if (data.exposingStudent !== '0') {
        data.exposingStudent = {id: data.exposingStudent};
    } else delete data.exposingStudent;
    delete data.personInfo;
    delete data.caseSelect;
    delete data.showClosed;
    delete data.disabled;
    data.hasSymptoms = (data.hasSymptoms === '1' ? true:false);

    console.log(data);
    const {editcase} = this.context;
    fetch(editcase+data.caseId, {
        headers: {
                  'Content-Type': 'application/json'
                 },
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Your case has been updated and its case number is ' + data.id);
        this.setState({disabled: false});
        //this.clearCaseData();
        if (this.props.onSubmit) this.props.onSubmit();
    }).catch((error) => {
        alert('Submission failed, check that you are logged into the system');
        this.setState({disabled: false});
    });

  }

  render() {
    return(
        <div className='case-form'>
          <label><input type="checkbox" id="showclosed" onChange={this.inputChanged} checked={this.state.showClosed} name="showClosed"/>Show closed cases
          {this.props.cases.length > 0 ? <><CaseList name="caseSelect" value={this.state.caseSelect} showClosed={this.state.showClosed} onChange={this.inputChanged} cases={this.props.cases}/>
            <button onClick={this.loadCase}>Load Case</button><button onClick={this.deleteCase}>Delete Case</button></>: null}</label><br/>
          <button onClick={this.clearCaseData}>Clear Form</button><br/>
          <label>Prepared by (name, add after previous name if updating):
            <input type="text" size="30" value={this.state.preparedBy} onChange={this.inputChanged} name="preparedBy"/>
            <button id="addName" onClick={this.addName}>Add My Name</button>
          </label><br/>
          <label>
            Primary Person<PersonList onChange={this.inputChanged} name="primaryStudent" value={this.state.primaryStudent} people={this.props.people} />
            <button onClick={this.updateInfo}>Show Contact Info</button>
            <PersonInfo name="PersonInfo" person={this.state.personInfo} cases={this.props.cases}/>
          </label><br/>
          <label>Date of Required Initial Evaluation <input type="date" id="requiredDate" name="requiredDate" value={this.state.requiredDate} onChange={this.inputChanged}/></label><br/>
          <label>Why contact for evaluation was made
            <select value={this.state.contactReason} onChange={this.inputChanged} name="contactReason" id="reason">
             <option value="1">Person's symptoms caused inquiry</option>
             <option value="2">Exposure to other possibly infected student or staff</option>
             <option value="3">Exposure to co-domiciled high-risk person</option>
             <option value="4">Exposure to high-risk person outside of home</option>
             <option value="5">Did not fill in Wellness app</option>
             <option value="0">None of these apply</option>
            </select>
          </label><br/>
          <label>
          Exposure Type
            <select value={this.state.exposureType} onChange={this.inputChanged} name="exposureType" id="exposuretype">
              <option value="0">--- SELECT AN OPTION ---</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label><br/>
          <label>
          Additional Exposure (if any)
            <select value={this.state.exposureType2} name="exposureType2" onChange={this.inputChanged} id="exposuretype2">
              <option value="0">None/NA</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label><br/>
          <label>
          Additional Exposure (if any)
            <select value={this.state.exposureType3} name="exposureType3" onChange={this.inputChanged} id="exposuretype3">
              <option value="0">None/NA</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label><br/>
          <label>Exposed by Person <PersonList defaultEmpty="NA/Not Applicable/See Notes" name="exposingStudent" value={this.state.exposingStudent} onChange={this.inputChanged} people={this.props.people} /></label><br/>
          <label>Date of Exposure <input type="date" value={this.state.exposureDate} onChange={this.inputChanged} name="exposureDate"/></label><br/>
          <label>Date of First Symptoms <input type="date" value={this.state.symptomDate} onChange={this.inputChanged} name="symptomDate"/></label><br/>
          <label>Epidemiological Risk Factors for exposure from outside of school<select value={this.state.epiHighRisk} onChange={this.inputChanged} id="epirisk" name="epiHighRisk">
             <option value="0">--- SELECT AN OPTION ---</option>
             <option value="1">Co-domiciled family member with known COVID-19</option>
             <option value="2">Co-domiciled family member with suspicious symptoms</option>
             <option value="3">Co-domiciled family member with high-risk exposure (airport, trip, bars)</option>
             <option value="4">Attended summer camp with high disease prevalence</option>
             <option value="5">Taken trip to a high-risk area</option>
             <option value="6">Use of a public airport</option>
             <option value="7">None of these apply</option>
            </select>
          </label>
          <h4>Symptoms</h4>
          <div>
            <label><input type="radio" onChange={this.inputChanged} checked={this.state.hasSymptoms == 1} id="hassymptoms" name="hasSymptoms" value="1"/>Has Symptoms
            <input type="radio" onChange={this.inputChanged} checked={this.state.hasSymptoms == 2} id="hasnosymptoms" name="hasSymptoms" value="2"/>Has No Symptoms</label>
          </div>
          <table className='case-form'>
          <tbody>
              <tr>
                  <td><input type="checkbox" id="fever" name="hasFever" onChange={this.inputChanged} checked={this.state.hasFever}/>
                      Fever greater than 100
                  </td>
              </tr>
              <tr>
                  <td>Record Temperature (Fahrenheit) <input type="number" id="temperature" name="temperature" onChange={this.inputChanged} value={this.state.temperature}/>
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="cough" name="hasCough" onChange={this.inputChanged} checked={this.state.hasCough}/>
                      Has cough
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="shortness" name="hasShortness" onChange={this.inputChanged} checked={this.state.hasShortness}/>
                      Shortness of Breath (non-asthmatic)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="breathing" name="hasBreathing" onChange={this.inputChanged} checked={this.state.hasBreathing}/>
                      Difficulty Breathing (non-asthmatic)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="smell" name="hasLostSmell" onChange={this.inputChanged} checked={this.state.hasLostSmell} />
                      New Loss of Smell
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="taste" name="hasLostTaste" onChange={this.inputChanged} checked={this.state.hasLostTaste}/>
                      New Loss of Taste
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="chills" name="hasChills" onChange={this.inputChanged} checked={this.state.hasChills}/>
                      Chills
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="myalgia" name="myalgia" onChange={this.inputChanged} checked={this.state.hasMyalgia}/>
                      Myalgia (muscle aches)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="throat" name="throat" onChange={this.inputChanged} checked={this.state.hasSoreThroat}/>
                      Sore Throat
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="nose" name="hasRunnyNose" onChange={this.inputChanged} checked={this.state.hasRunnyNose}/>
                      Runny Nose
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="congestion" name="hasCongestion" onChange={this.inputChanged} checked={this.state.hasCongestion}/>
                      Congestion
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="nausea" name="hasNausea" onChange={this.inputChanged} checked={this.state.hasNausea}/>
                      Nausea
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="vomiting" name="hasVomiting" onChange={this.inputChanged} checked={this.state.hasVomiting}/>
                      Vomiting
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="diarrhea" name="hasDiarrhea" onChange={this.inputChanged} checked={this.state.hasDiarrhea}/>
                      Diarrhea
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="headache" name="hasHeadache" onChange={this.inputChanged} checked={this.state.hasHeadache}/>
                      Headache (new onset, non-migraine history, non-caffeine w/d, non-sleep deprivation)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="fatigue" name="hasFatigue" onChange={this.inputChanged} checked={this.state.hasFatigue}/>
                      New Fatigue (excessive, out-of-ordinary, non-sleep deprivation)
                  </td>
              </tr>
          </tbody>
          </table>
          <label><b>Certainty of COVID-19 Disease</b> <select id="certainty" name="certainty" onChange={this.inputChanged} value={this.state.certainty}>
             <option value="0">---SELECT A VALUE---</option>
             <option value="1">Definite</option>
             <option value="2">Probable</option>
             <option value="3">Possible</option>
             <option value="4">Not COVID-19</option>
            </select>
          </label><br/>
          <label>COVID-19 Test Result 1 <select id="testresult" name="testResult" onChange={this.inputChanged} value={this.state.testResult}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
            </select> Date <input type="date" onChange={this.inputChanged} name="testDate" value={this.state.testDate}/></label><br/>
          <label>COVID-19 Test Result 2 <select id="testresult2" name="testResult2" onChange={this.inputChanged} value={this.state.testResult2}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
             </select> Date <input type="date" onChange={this.inputChanged} name="testDate2" value={this.state.testDate2}/></label><br/>
           <label>COVID-19 Test Result 3 <select id="testresult3" name="testResult3" onChange={this.inputChanged} value={this.state.testResult3}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
              </select> Date <input type="date" onChange={this.inputChanged} name="testDate3" value={this.state.testDate3}/></label><br/>
           <label>NOTES/COMMENTS<br/><textarea rows="4" cols="69" onChange={this.inputChanged} name="notes" value={this.state.notes}></textarea></label><br/>
           <SecondarySelect selectedPeople={this.state.selectedOptions} secondaryAdded={this.state.secondaryAdded} secondaryChanged={this.secondaryChanged}
                secondarySelected={this.state.secondarySelected} people={this.props.people} addSecondary={this.addSecondary} removeSecondary={this.removeSecondary}
                exposedClass={this.state.exposedClass} exposedClassFirst={this.state.exposedClassFirst}
                exposedClassOutside={this.state.exposedClassOutside} exposedClassOutsideFirst={this.state.exposedClassOutsideFirst}
                exposedBus={this.state.exposedBus} exposedBusFirst={this.state.exposedBusFirst}
                exposedOutside={this.state.exposedOutside} exposedCarpool={this.state.exposedCarpool} secondaryPropChange={this.exposedPropChanged} selectChanged={this.selectChanged}/>
           <label><input type="checkbox" id="admincase" onChange={this.inputChanged} checked={this.state.administrativeCase} name="administrativeCase"/>
             <b>ADMINISTRATIVE CASE, NOT ILLNESS RELATED (leave notes/comments above)</b></label><br/>
           <label><input type="checkbox" id="followup" name="followup" onChange={this.inputChanged} checked={this.state.followup} />
            <b>Follow-up Required</b> by <input type="date" onChange={this.inputChanged} value={this.state.followupDate} name="followupDate" id="followupDate"/><br/></label>
           <label><input type="checkbox" id="stayhome" name="stayHome" onChange={this.inputChanged} checked={this.state.stayHome}/>
            <b>REQUIRED TO STAY HOME</b></label><br/>
            <label><input type="checkbox" id="drpermission" name="doctorPermission" checked={this.state.doctorPermission} onChange={this.inputChanged}/>
            <b>DOCTOR HAS GIVEN WRITTEN PERMISSION TO RETURN TO SCHOOL</b></label><br/>
            <label><input type="checkbox" id="awaitingdocumentation" name="awaitingDocumentation" checked={this.state.awaitingDocumentation} onChange={this.inputChanged}/>
            <b>AWAITING DOCUMENTATION TO CLOSE CASE</b></label><br/>
            <label><input type="checkbox" id="resolved" name="resolved" checked={this.state.resolved} onChange={this.inputChanged}/>
            <b>CASE RESOLVED</b></label><br/>
            <button disabled={this.state.disabled} onClick={this.submitCase}>{this.state.disabled ? 'Sending...' : 'Submit as New Case'}</button>  <button onClick={this.clearCaseData}>Clear Form</button>
            <br/>
            <button disabled={this.state.disabled} onClick={this.updateCase}>{this.state.disabled ? 'Sending...' : 'Update Existing Case'}</button> CASE ID <input type="text" name="caseId" disabled={true} readOnly="readonly" value={this.state.caseId} onChange={(e) => console.log("Nothing")}/>
        </div>
    );
  }

}

export default CaseForm;
