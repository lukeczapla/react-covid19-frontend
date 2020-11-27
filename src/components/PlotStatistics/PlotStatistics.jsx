import React, {useState} from 'react'; // {useRef, useEffect} not used
import Plot from 'react-plotly.js';

function numberOfDays(cCase, today) {
    let result = (today.getTime() - new Date(cCase.requiredDate).getTime()) / (60*60*24*1000);
    if (result < 0) return 0;
    return Math.ceil(result);
}

function generateDays(N, today) {
    let days = {};
    for (let i = 0; i <= N; i++) {
        days[new Date(today.getTime() - i*24*60*60*1000).toUTCString().slice(5, 16)] = 0;
    }
    return days;
}

const PlotStatistics = ({cases}) => {

    const [state, setState] = useState({
        Ndays: 30,
        plotDefinite: true,
        plotProbable: false,
        plotPossible: false,
        plotNotInfected: false,
        plot9th: true,
        plot10th: true,
        plot11th: true,
        plot12th: true,
        plot13th: false,
        plot14th: false
    });


    const inputChanged = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;
        setState({
            ...state,
            [name]: value
        });
    }

    const plotTimeSeries = () => {
        let markersize = 8;
        let fontsize = 14;
        let today = new Date();
        let Ndays = parseInt(state.Ndays);
        let daylist = generateDays(Ndays, today);
        let list = buildPoints(daylist);
        let xvalues = [];
        let yvalues = [];
        let max = 0;
        for (const property in list) {
            xvalues.push(property);
            yvalues.push(list[property]);
            if (list[property] > max) max = list[property];
        }
        let dtickvalue = 1;
        if (max > 15) dtickvalue = 2;
        if (max > 30) dtickvalue = 3;
        if (max > 45) dtickvalue = 4;
        if (max > 60) dtickvalue = 5;
        let title = "";
        if (state.plotDefinite) title += "Definite";
        if (state.plotProbable) (title === "" ? title += "Probable" : title += " and Probable");
        if (state.plotPossible) (title === "" ? title += "Possible" : title += " and Possible");
        if (state.plotNotInfected) (title === "" ? title += "Not Infected" : title += " and Not Infected");
        title += " Cases in Population by Day";
        max++;
        setState({...state, data: [{
            x: xvalues,
            y: yvalues,
            type: 'scatter',
            mode: 'markers+lines',
            marker: {
                color: 'rgb(50, 50, 255)',
                size: markersize,
                line: {
                  color: 'rgb(0, 0, 0)',
                  width: 1
                }
            }
            }],
            layout: {
              title: title,
              width: 800,
              height: 600,
              margin: {
                b: 150
              },
              font: {
                size: fontsize
              },
              xaxis: {
                range: [0, Ndays],
                autorange: 'reversed',
                showgrid: true,
                showline: true,
                gridwidth: 2,
                gridcolor: '#777777',
                //title: 'number of days before today',
                automargin: true,
                linewidth: 1
              },
              yaxis: {
                range: [0, max],
                showgrid: true,
                showline: true,
                dtick: dtickvalue,
                gridwidth: 2,
                gridcolor: '#777777',
                title: 'NUMBER OF NEW CASES',
                linewidth: 1
              }
            }
        });
    }

    const buildPoints = (days) => {
        let today = new Date();
        let list = [];
        list.length = state.Ndays+1;
        list.fill(0);
        let maxdays = 0;
        for (let i = 0; i < cases.length; i++) {
            if (cases[i].administrativeCase) continue;
            if (cases[i].primaryStudent.grade === 9 && !state.plot9th) continue;
            if (cases[i].primaryStudent.grade === 10 && !state.plot10th) continue;
            if (cases[i].primaryStudent.grade === 11 && !state.plot11th) continue;
            if (cases[i].primaryStudent.grade === 12 && !state.plot12th) continue;
            if (cases[i].primaryStudent.grade === 13 && !state.plot13th) continue;
            if (cases[i].primaryStudent.grade === 14 && !state.plot14th) continue;

            if (cases[i].certainty === 1 && !state.plotDefinite) continue;
            if (cases[i].certainty === 2 && !state.plotProbable) continue;
            if (cases[i].certainty === 3 && !state.plotPossible) continue;
            if (cases[i].certainty === 4 && !state.plotNotInfected) continue;
            if (cases[i].certainty === 0) continue;
            if (days[new Date(cases[i].requiredDate).toUTCString().slice(5, 16)] == null) continue;
            days[new Date(cases[i].requiredDate).toUTCString().slice(5, 16)]++;
            let nDays = numberOfDays(cases[i], today);
            if (nDays > maxdays) maxdays = nDays;
            if (nDays > state.Ndays) continue;
        }
        setState({...state, graphStats: "The earliest recorded selected case goes back " + maxdays + " days"});
        return days;

    }

    return (
        <div>
            Number of days to go back<input type="number" step="1" name="Ndays" value={state.Ndays} onChange={inputChanged}/><br/>
            Confirmation:
              <table>
                <tbody>
                  <tr><td><input type="checkbox" name="plotDefinite" checked={state.plotDefinite} onChange={inputChanged}/>Definite</td>
                      <td><input type="checkbox" name="plotProbable" checked={state.plotProbable} onChange={inputChanged}/>Probable</td>
                      <td><input type="checkbox" name="plotPossible" checked={state.plotPossible} onChange={inputChanged}/>Possible</td>
                      <td><input type="checkbox" name="plotNotInfected" checked={state.plotNotInfected} onChange={inputChanged}/>Not infected</td>
                  </tr>
                </tbody>
              </table>
            Grade Level(s):
              <table>
                <tbody>
                  <tr><td><input type="checkbox" name="plot9th" checked={state.plot9th} onChange={inputChanged}/>9th grade</td>
                      <td><input type="checkbox" name="plot10th" checked={state.plot10th} onChange={inputChanged}/>10th grade</td>
                      <td><input type="checkbox" name="plot11th" checked={state.plot11th} onChange={inputChanged}/>11th grade</td>
                      <td><input type="checkbox" name="plot12th" checked={state.plot12th} onChange={inputChanged}/>12th grade</td>
                      <td><input type="checkbox" name="plot13th" checked={state.plot13th} onChange={inputChanged}/>Faculty/Staff</td>
                      <td><input type="checkbox" name="plot14th" checked={state.plot14th} onChange={inputChanged}/>Associates</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={plotTimeSeries}>Create History Graph</button><br/>
              <i>{state.graphStats}</i>
              {(state.layout ? <Plot layout={state.layout} data={state.data} /> : null)}
        </div>

    );

}

export default PlotStatistics;