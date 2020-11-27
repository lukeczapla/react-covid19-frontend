import React from 'react';

const PersonInfo = ({name, person, cases}) => {

    if (person === undefined || person === null) return null;
    let gr = "Grade " + person.grade;
    let pr = <></>;
    if (person.grade === 13) gr = "Faculty/Staff";
    else if (person.grade === 14) gr = "Associate (" + person.classes + ")";
    else {
      pr = <>{"Parent 1: " + person.parent1}<br/>{"Parent 2: " + person.parent2}<br/></>
    }
    return (
        <div name={name}>
            <b>{person.firstName + " " + person.lastName}</b><br/>
            {gr}<br/>
            {"Cell Phone: " + person.cellPhone}<br/>
            {person.grade !== 14 ? person.homeAddress : "Email: " + person.email}<br/>
            {"Home Phone: " + person.homePhone}<br/>
            {pr}
            <b>All Related Cases/Incidents</b>
            <ul>
            {cases.filter((ccase) => ccase.primaryStudent.id === person.id).map((ccase) => (
                <li key={ccase.id}>{"Case " + ccase.id + " required on date " + new Date(ccase.requiredDate).toUTCString().slice(5,16)
                   + (ccase.followup ? " follow-up by " + new Date(ccase.followupDate).toUTCString().slice(5, 16) : "")} </li>
            ))}
            </ul>
        </div>
    );

}

export default PersonInfo;