import React, { useState, useEffect, useContext } from 'react';
import {ApiContext} from '../../api-context';

const PersonList = (props) => {
    const [people, setPeople] = useState([]);
    const api = useContext(ApiContext);

    const inputChanged = (e) => {
      if (props.onChange) {
        props.onChange(e);
      }
    }

    useEffect(() => {
        if (props.people !== undefined) {
          setPeople(props.people);
        }
        else fetch(api.getpeople, {
          method: 'GET',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => (a.lastName === b.lastName) ? ((a.firstName > b.firstName) ? 1 : -1) : ((a.lastName > b.lastName) ? 1 : -1));
            setPeople(data);
            if (props.onFetch !== undefined) props.onFetch(data);
            console.log("refreshed people");
           // illegal: props.people = data;
        }).catch((error) => {
            console.log("Error: ", error);
        });
        //else console.log(people);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.v, props.people]);

    return (
        <>
          {people.length > 0 ? <select name={props.name} value={props.value} onChange={inputChanged}>
            {props.defaultEmpty ? <option key="0" value="0">{props.defaultEmpty}</option> : null}
            {people.map((person) => (
                <option key={person.id} value={person.id}>{person.lastName + ", " + person.firstName + " " + person.id}</option>
            ))}
        </select> : null}
        </>
    );
}

export default PersonList;