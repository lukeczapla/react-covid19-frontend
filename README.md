# COVID Tracing with Demo Simulator
![Screenshot](https://github.com/lukeczapla/react-frontend/blob/master/snapshot.png?raw=true)

Code was created with React.
The program includes database frontend along with some interesting components for infection modelling with \
the HTML5 canvas (and graphs with react-plotly). The database backend is not provided due to currently being deployed,
though it would certainly be possible to set it up for other institutions with similar needs.

## Available Scripts

In the project folder, you can run:

### `./update`

Simple script builds the production code and moves it into the main webapp folder for a website.

### `yarn start`

Runs the system in the development mode.\
Editing will reprocess and serve up the changes.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
ApiContext configs.testing was used for testing with crossorigin requests. (see index.js)

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

