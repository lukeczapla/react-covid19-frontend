import React from 'react';
import './CaseForm.css';
import PersonList from '../PersonList/PersonList.jsx';

class CaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        preparedBy: '',
        primaryStudent: 1,
        exposureType: 0,
        exposureType2: 0,
        exposureType3: 0,
        certainty: 0,
        contactReason: 1,
        epiHighRisk: 0,
        hasFever: false,
        hasCough: false,
        temperature: "",
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
        testDate1: "",
        testDate2: "",
        testDate3: "",
        symptomDate: "",
        exposureDate: "",
        requiredDate: "",
        resolved: false,
        administrativeCase: false
    };
    this.inputChange = this.inputChange.bind(this);
//    this.getPrimaryPerson = this.getPrimaryPerson.bind(this);
  }


  inputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
    if (name === 'administrativeCase' && value === true) {
      this.setState({resolved: true});
    }
    console.log(name + " " + value);
  }
/*
  getPrimaryPerson = (data) => {
    const target = data.target;
    const value = target.value;
    const name = target.name;
    console.log(target.name + " " + value);
    this.setState({
      primaryStudent: value
    });
  }
*/
  clearCaseData = () => {
    console.log(this.state);
    this.setState({
        preparedBy: "",
        exposureType: 0,
        exposureType2: 0,
        exposureType3: 0,
        certainty: 0,
        contactReason: 1,
        epiHighRisk: 0,
        hasFever: false,
        hasCough: false,
        temperature: "",
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
        testDate1: "",
        testDate2: "",
        testDate3: "",
        symptomDate: "",
        exposureDate: "",
        requiredDate: ""
    });
  }

  updateInfo() {

  }

  addName = (e) => {
    //console.log(e.target);
    //console.log(e.target.name);
    if (this.props.addName !== undefined) this.setState({preparedBy: this.props.addName(e)});
  }

  render() {
    return(
        <div>
          <button onClick={this.clearCaseData}>Clear Form</button><br/>
          <label>Prepared by (name, add after previous name if updating):
            <input type="text" size="30" value={this.state.preparedBy} onChange={this.inputChange} name="preparedBy"/>
            <button id="addName" onClick={this.addName}>Add My Name</button>
          </label>
          <label>
            Primary Person
            <PersonList onChange={this.inputChange} name="primaryPerson" people={this.props.people} />
            <button onClick={this.updateInfo}>Show Contact Info</button>
          </label>
          <label>Date of Required Initial Evaluation <input type="date" id="requiredDate" name="requiredDate" value={this.state.requiredDate} onChange={this.inputChange}/></label>
          <label>Why contact for evaluation was made
            <select value={this.state.contactReason} onChange={this.inputChange} name="contactReason" id="reason">
             <option value="1">Person's symptoms caused inquiry</option>
             <option value="2">Exposure to other possibly infected student or staff</option>
             <option value="3">Exposure to co-domiciled high-risk person</option>
             <option value="4">Exposure to high-risk person outside of home</option>
             <option value="5">Did not fill in Wellness app</option>
             <option value="0">None of these apply</option>
            </select>
          </label>
          <label>
          Exposure Type
            <select value={this.state.exposureType} onChange={this.inputChange} name="exposureType" id="exposuretype">
              <option value="0">--- SELECT AN OPTION ---</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label>
          <label>
          Additional Exposure (if any)
            <select value={this.state.exposureType2} name="exposureType2" onChange={this.inputChange} id="exposuretype2">
              <option value="0">--- SELECT AN OPTION ---</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label>
          <label>
          Additional Exposure (if any)
            <select value={this.state.exposureType3} name="exposureType3" onChange={this.inputChange} id="exposuretype3">
              <option value="0">None/NA</option>
              <option value="1">Class, First Degree</option>
              <option value="2">Class, non-first degree</option>
              <option value="3">Bus, First Degree</option>
              <option value="4">Bus, non-first degree</option>
              <option value="5">Carpool</option>
              <option value="6">Outside of School</option>
              <option value="7">No exposure</option>
            </select>
          </label>
          <label>Exposed by Person <PersonList people={this.props.people} /></label>
          <label>Date of Exposure <input type="date" value={this.state.exposureDate} onChange={this.inputChange} name="exposureDate"/></label>
          <label>Date of First Symptoms <input type="date" value={this.state.symptomDate} onChange={this.inputChange} name="symptomDate"/></label>
          <label>Epidemiological Risk Factors for exposure from outside of school<select value={this.state.epiHighRisk} onChange={this.inputChange} id="epirisk" name="epiHighRisk">
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
          <div onChange={this.inputChange}>
            <label><input type="radio" id="hassymptoms" name="symstate" value="1"/>Has Symptoms
            <input type="radio" id="hasnosymptoms" name="symstate" value="2"/>Has No Symptoms</label>
          </div>
          <h4>Symptoms</h4>
          <table>
          <tbody>
              <tr>
                  <td><input type="checkbox" id="fever" name="hasFever" onChange={this.inputChange} checked={this.state.hasFever}/>
                      Fever greater than 100
                  </td>
              </tr>
              <tr>
                  <td>Record Temperature (Fahrenheit) <input type="number" id="temperature" name="temperature" onChange={this.inputChange} value={this.state.temperature}/>
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="cough" name="hasCough" onChange={this.inputChange} checked={this.state.hasCough}/>
                      Has cough
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="shortness" name="hasShortness" onChange={this.inputChange} checked={this.state.hasShortness}/>
                      Shortness of Breath (non-asthmatic)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="breathing" name="hasBreathing" onChange={this.inputChange} checked={this.state.hasBreathing}/>
                      Difficulty Breathing (non-asthmatic)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="smell" name="hasLostSmell" onChange={this.inputChange} checked={this.state.hasLostSmell} />
                      New Loss of Smell
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="taste" name="hasLostTaste" onChange={this.inputChange} checked={this.state.hasLostTaste}/>
                      New Loss of Taste
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="chills" name="hasChills" onChange={this.inputChange} checked={this.state.hasChills}/>
                      Chills
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="myalgia" name="myalgia" onChange={this.inputChange} checked={this.state.hasMyalgia}/>
                      Myalgia (muscle aches)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="throat" name="throat" onChange={this.inputChange} checked={this.state.hasSoreThroat}/>
                      Sore Throat
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="nose" name="hasRunnyNose" onChange={this.inputChange} checked={this.state.hasRunnyNose}/>
                      Runny Nose
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="congestion" name="hasCongestion" onChange={this.inputChange} checked={this.state.hasCongestion}/>
                      Congestion
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="nausea" name="hasNausea" onChange={this.inputChange} checked={this.state.hasNausea}/>
                      Nausea
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="vomiting" name="hasVomiting" onChange={this.inputChange} checked={this.state.hasVomiting}/>
                      Vomiting
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="diarrhea" name="diarrhea" onChange={this.inputChange} checked={this.state.hasDiarrhea}/>
                      Diarrhea
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="headache" name="hasHeadache" onChange={this.inputChange} checked={this.state.hasHeadache}/>
                      Headache (new onset, non-migraine history, non-caffeine w/d, non-sleep deprivation)
                  </td>
              </tr>
              <tr>
                  <td><input type="checkbox" id="fatigue" name="hasFatigue" onChange={this.inputChange} checked={this.state.hasFatigue}/>
                      New Fatigue (excessive, out-of-ordinary, non-sleep deprivation)
                  </td>
              </tr>
          </tbody>
          </table>
          <label>Certainty of COVID-19 Disease <select id="certainty" name="certainty" onChange={this.inputChange} value={this.state.certainty}>
             <option value="0">---SELECT A VALUE---</option>
             <option value="1">Definite</option>
             <option value="2">Probable</option>
             <option value="3">Possible</option>
             <option value="4">Not COVID-19</option>
            </select>
          </label>
          <label>COVID-19 Test Result 1<select id="testresult" name="testResult" onChange={this.inputChange} value={this.state.testResult}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
            </select>Date <input type="date" onChange={this.inputChange} name="testDate1" value={this.state.testDate1}/></label>
          <label>COVID-19 Test Result 2 <select id="testresult2" name="testResult2" onChange={this.inputChange} value={this.state.testResult2}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
             </select>Date <input type="date" onChange={this.inputChange} name="testDate2" value={this.state.testDate2}/></label>
           <label>COVID-19 Test Result 3 <select id="testresult3" name="testResult3" onChange={this.inputChange} value={this.state.testResult3}>
                <option value="1">Not available</option>
                <option value="2">Negative, Unknown test type</option>
                <option value="3">Positive, Unknown test type</option>
                <option value="4">Negative, PCR test</option>
                <option value="5">Positive, PCR test</option>
                <option value="6">Negative, Antigen (rapid) test</option>
                <option value="7">Positive, Antigen (rapid) test</option>
              </select>Date <input type="date" onChange={this.inputChange} name="testDate3" value={this.state.testDate3}/></label>
           <label>NOTES/COMMENTS<br/><textarea rows="4" cols="69" onChange={this.inputChange} name="comments" value={this.state.comments}></textarea></label>
           <label><input type="checkbox" id="admincase" onChange={this.inputChange} checked={this.state.administrativeCase} name="administrativeCase"/>
             <b>ADMINISTRATIVE CASE, NOT ILLNESS RELATED (leave notes/comments above)</b></label>
           <label><input type="checkbox" id="followup" name="followup" onChange={this.inputChange} checked={this.state.followup} />
            <b>Follow-up Required</b> by <input type="date" onChange={this.inputChange} value={this.state.followupDate} name="followupDate" id="followupDate"/><br/></label>
           <label><input type="checkbox" id="stayhome" name="stayHome" onChange={this.inputChange} checked={this.state.stayHome}/>
            <b>REQUIRED TO STAY HOME</b><br/></label>
            <label><input type="checkbox" id="drpermission" name="doctorPermission" checked={this.state.doctorPermission} onChange={this.inputChange}/>
            <b>DOCTOR HAS GIVEN WRITTEN PERMISSION TO RETURN TO SCHOOL</b></label>
            <label><input type="checkbox" id="awaitingdocumentation" name="awaitingDocumentation" checked={this.state.awaitingDocumentation} onChange={this.inputChange}/>
            <b>AWAITING DOCUMENTATION TO CLOSE CASE</b></label>
            <label><input type="checkbox" id="resolved" name="resolved" checked={this.state.resolved} onChange={this.inputChange}/>
            <b>CASE RESOLVED</b></label>
        </div>

    );
  }

}

export default CaseForm;