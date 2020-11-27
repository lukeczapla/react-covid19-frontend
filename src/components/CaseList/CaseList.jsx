import React, { useState, useEffect, useContext } from 'react';
import {ApiContext} from '../../api-context';

const CaseList = (props) => {
    const [cases, setCases] = useState([]);
    const api = useContext(ApiContext);
    //const [selected, setSelected] = useState(1);

    const inputChanged = (e) => {
      if (props.onChange) {
        props.onChange(e);
      }
    }

    useEffect(() => {
        if (props.cases !== undefined) {
          //if (cases.length === 0) setSelected(props.cases[0].id);
          setCases(props.cases);
        }
        else fetch(api.getcases, {
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            //data.sort((a, b) => (a.lastName === b.lastName) ? ((a.firstName > b.firstName) ? 1 : -1) : ((a.lastName > b.lastName) ? 1 : -1));
            data.reverse();
            //if (cases.length === 0) setSelected(data[0].id);
            setCases(data);
            if (props.onFetch !== undefined) props.onFetch(data);
            console.log("refreshed cases");
        }).catch((error) => {
            console.log("Error: ", error);
        });
        //else console.log(cases);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.v, props.cases]);
    return (
        <>
          {cases.length > 0 ? <select name={props.name} value={props.value} onChange={inputChanged}>
            {props.defaultEmpty ? <option key="0" value="0">{props.defaultEmpty}</option> : null}
            {cases.filter((ccase) => !ccase.resolved || props.showClosed).map((ccase) => (
                <option key={ccase.id} value={ccase.id}>{(ccase.resolved ? "[CLOSED] " : "") + ccase.id + " "
                 + ccase.primaryStudent.lastName + ", " + ccase.primaryStudent.firstName + " "
                 + new Date(ccase.requiredDate).toISOString().slice(0,10)
                 + (ccase.followup && !ccase.resolved ? " follow-up by " + new Date(ccase.followupDate).toISOString().slice(0,10): "")}</option>
            ))}</select> : null}
        </>
    );

}

export default CaseList;