# COVID-19 Case Reporting and Contact Tracing with Demo Simulator

Code was created with React.
The program includes the database's frontend along with some interesting components for infection modelling with
the HTML5 canvas (and graphs with react-plotly). The database backend is not provided due to currently being deployed,
though it would certainly be possible to set it up for institutions with similar needs.  Description of functionality
by component follows.

## Components

### CaseForm 
    This is the main questionaire survey of symptoms, date of evaluation, date of exposure, epidemiological risk factors
    for possible infection, source location for exposure, and a selection tool for adding any number of exposed people and 
    the site of exposure (then creating a record for each student in the exposure data and a new primary case with immediate 
    required follow-up date) - see SecondarySelect.  There are tools for updating cases, adding new cases, and
    (optionally) deleting cases, though unimportant cases can be left and marked as administrative errors for full auditing.

### CaseList and PersonList 
    Lightweight React components for selecting people and cases, either through an API fetch
    or from lists obtained from an existing fetch.

### PersonInfo 
    Pulls up full contact data for a selected person (student or faculty/staff).

### PlotStatistics
    Creates multiple time series (x-axis is dates like 02-Aug-2020) of cases by day up to any
    number of days going back.  Queries can be based upon students (by grade level) and employees/associates,
    and cases filtered by certainty of COVID-19: definite, probable, possible, and not infected.
    
### Reporting
    The backend creates 6 different Excel/Sheets (.xlsx) files of immediate cases to follow up on, people
    that cannot be allowed into the facility, persons awaiting medical documentation to resolve their case status,
    all open cases by most recent date, the full report of cases with all fields, and the full report of exposures.

### SecondarySelect
    A helper "widget" for the CaseForm for adding and removing exposures.

### Simulation
    A basic simulation of pandemic conditions (% initially exposed, infection distance and probability,
    parameters for social distancing measures, and other properties for a pandemic model based on random walkers.
![Screenshot](https://github.com/lukeczapla/react-frontend/blob/master/snapshot.png?raw=true)

    
## Available Scripts

In the project folder, you can run:

### `./update`

Simple script builds the production code and moves it into the main webapp folder for a website.

### `yarn start`

Runs the system in the development mode.\
Editing will reprocess and serve up the changes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
ApiContext configs.testing was used for testing with cross-origin requests. (see index.js)

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles the webpack for production mode and optimizes the build for the best performance.

