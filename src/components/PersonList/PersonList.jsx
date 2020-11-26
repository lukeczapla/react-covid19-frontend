import React, { useState, useEffect, useContext } from 'react';
import {ApiContext} from '../../api-context';

const PersonList = (props) => {
    const [people, setPeople] = useState([]);
    //const [selected, setSelected] = useState(1);
    const api = useContext(ApiContext);

    const inputChanged = (e) => {
      //setSelected(e.target.value);
      //console.log(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    }

    useEffect(() => {
        if (props.people !== undefined) {
          //if (people.length === 0) setSelected(props.people[0].id);
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
            //if (people.length === 0) setSelected(data[0].id);
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
        <div>
        {people.length > 0 ? <select name={props.name} value={props.value} onChange={inputChanged}>
            {people.map((person) => (
                <option key={person.id} value={person.id}>{person.lastName + ", " + person.firstName + " " + person.id}</option>
            ))}
        </select> : null}
        </div>
    );
}

export default PersonList;