import React, {Component, useRef, useEffect} from 'react';
import Plot from 'react-plotly.js';
import './Simulation.css';

const HEALTHY = 0;
const INFECTED = 1;
const RECOVERED = 2;

function overlaps(t, other) {
    return (Math.sqrt((t[0]-other[0])*(t[0]-other[0])+(t[1]-other[1])*(t[1]-other[1])) < 6);
}

function distance(t, other) {
    return Math.sqrt((t[0]-other[0])*(t[0]-other[0])+(t[1]-other[1])*(t[1]-other[1]));
}

class Simulation extends Component {
    constructor() {
        super();
        this.state = {
            startshown: true,
            stopshown: false,
            makeplot: false
        }
        this.cref = React.createRef();
        this.ctx = null;
        this.timestep = 0;
        this.N = 0;
        this.people = [];
    }

    draw(t) {
            this.ctx.beginPath();
            this.ctx.arc(t[0], t[1], 3, 0, 2 * Math.PI, false);
            if (t[2] === HEALTHY) this.ctx.fillStyle = 'blue';
            if (t[2] === INFECTED) this.ctx.fillStyle = 'red';
            if (t[2] === RECOVERED) this.ctx.fillStyle = 'green';
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#003300';
            this.ctx.stroke();
    }

    plot() {
        this.setState({ makeplot: true, layout: {title: 'Total cases in population',
             xaxis: {
                  range: [0],
                  showgrid: true,
                  showline: true,
                  gridwidth: 2,
                  gridcolor: '#777777',
                  title: 'time step',
                  linewidth: 1
             },
             yaxis: {
                  range: [0, this.max+1],
                  showgrid: true,
                  showline: true,
                  gridwidth: 2,
                  gridcolor: '#777777',
                  title: 'total cases',
                  linewidth: 1
             }}, data: [{y: this.state.dataY, type: 'scatter' }], revision: this.N });
    }


    animate() {

        // this is needed as an override in React because CSS style doesn't affect the canvas dimensions
        this.ctx.canvas.width = 600;
        this.ctx.canvas.height = 600;
        console.log("animating " + this.ctx.canvas.width + " " + this.ctx.canvas.height);

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let healthy = 0, sick = 0, better = 0;
        this.max = 0;
        for (let i = 0; i < this.N; i++) {
            //console.log("drawing");
            this.draw(this.people[i]);
            if (this.people[i][2] === HEALTHY) healthy++;
            if (this.people[i][2] === INFECTED) sick++;
            if (this.people[i][2] === RECOVERED) better++;
            if (this.socialT === this.timestep && i !== 0 && Math.random() < this.p_d)
                this.people[i][4] = true;
            if (!this.people[i][4]) {
                this.people[i][0] += (6*(Math.random() - 0.5));
                if (this.people[i][0] < 0) this.people[i][0] = 0;
                if (this.people[i][0] > 600) this.people[i][0] = 600;
                this.people[i][1] += (6*(Math.random() - 0.5));
                if (this.people[i][1] < 0) this.people[i][1] = 0;
                if (this.people[i][1] > 600) this.people[i][1] = 600;
            }
            if (this.people[i][2] === INFECTED && this.timestep >= this.people[i][3]+this.tr) this.people[i][2] = RECOVERED;
        }

        let newdataY = this.state.dataY.slice();
        if (sick+better > this.max) this.max = sick+better;
        newdataY.push(sick+better);
        this.setState( {dataY: newdataY} );
        this.plot();

        document.getElementById('info').innerHTML = "Step " + (this.timestep+1) + ": " + healthy+" healthy, " + sick + " sick, and " + better + " recovered";

        for (let i = 0; i < this.N; i++) {
          if (this.people[i][2] == HEALTHY) {

            for (let j = 0; j < this.N && this.people[i][2] == HEALTHY; j++) {
                if (this.people[j][2] == INFECTED) {
                    if (distance(this.people[i], this.people[j]) < 6+this.dist) {
                        if (Math.random() < this.p_i) {
                          if (this.people[i][4]) {
                            if (Math.random() > this.efficacy) {
                              this.people[i][2] = INFECTED;
                              this.people[i][3] = this.timestep;
                            }
                          }
                          else {
                            this.people[i][2] = INFECTED;
                            this.people[i][3] = this.timestep;
                          }
                        }
                    }
                }
            }
          }
        }
        this.timestep++;
    }

    runSimulation() {
        this.N = parseInt(document.getElementById('Npeople').value);
        this.initialfraction = parseInt(document.getElementById('pinfected').value)/100.0;

        this.dist = parseInt(document.getElementById('dinfection').value);
        this.p_i = parseFloat(document.getElementById('pinfection').value);
        this.tr = parseInt(document.getElementById('trecovery').value);

        this.p_d = parseInt(document.getElementById('psocial').value)/100.0;
        this.efficacy = parseFloat(document.getElementById('efficacy').value);
        this.socialT = parseInt(document.getElementById('socialT').value);

        this.timestep = 0;
        this.state.dataY = [];

        this.canvas = this.cref.current;
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            console.log("generating");
            for (let i = 0; i < this.N; i++) {

              let overlap = false;
              let person = null;
              do {
                overlap = false;
                person = [600*Math.random(), 600*Math.random(), HEALTHY, 0, false];
                for (let j = 0; j < i && !overlap; j++) {
                    if (overlaps(person, this.people[j])) {
                        overlap = true;
                    }
                }
              } while (overlap);
              console.log("done generating");
              if (i == 0 || Math.random() < this.initialfraction) person[2] = INFECTED;
              //if (socialT == 0 && i != 0 && Math.random() < p_d) person[4] = true;
              this.people.push(person);

            }

            //if (nographics) simulateSteps(1100);
            this.timer = window.setInterval(()=>this.animate(), 200);
            this.setState({
                startshown: false,
                stopshown: true
            });
        }
    }

    stopSimulation() {
        window.clearInterval(this.timer);
        this.people.length = 0;
        this.setState({
            startshown: true,
            stopshown: false
        });
    }

    render() {
        return(
            <div>
             <label>Number of people</label> <input type="number" step="1" defaultValue="1000" id="Npeople"/>
             <label>Percent initially infected</label> <input type="number" step="1" defaultValue="0" id="pinfected"/>
             <br/>
             <label>Infection distance</label> <input type="number" step="1" defaultValue="6" id="dinfection"/>
             <label>Infection probability</label><input type="number" step="0.01" defaultValue="0.1" id="pinfection"/>
             <br/>
             <label>Recovery time</label><input type="number" step="1" defaultValue="100" id="trecovery"/>
             <br/>
             <label>Social distance (%)</label><input type="number" step="1" defaultValue="0" id="psocial"/>
             <label>Efficacy</label><input type="number" step="0.01" defaultValue="0.8" id="efficacy"/>
             <label>Start at time</label><input type="number" step="1" defaultValue="0" id="socialT"/>
             <br/>
             <canvas ref={this.cref} className="Sim-window"></canvas>
             <div id="info"></div>
             {this.state.makeplot ? <Plot layout={this.state.layout} data={this.state.data} revision={this.state.revision} /> : null}
             <br/>
             {this.state.startshown ? <button onClick={() => this.runSimulation()}>Start Simulation</button> : null}
             {this.state.stopshown ? <button style={{visibility: this.stopshown}} onClick={() => this.stopSimulation()}>Stop Simulation</button> : null}
            </div>
        );
    }
}


export default Simulation;
