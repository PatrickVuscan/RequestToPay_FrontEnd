# Request To Pay - Front End Application

## Access Methods

### Accessing On Heroku

Visit: https://request-to-pay.herokuapp.com/

### Setting Up Locally

1) Checkout the master branch
2) Install the dependencies by running 'npm install' in the project directory
3) Start the application by running 'npm start' in the project directory

--------------------------------

## Login Credentials

### Primarily Customer
Username: patrick \
Password: patrick

### Primarily Seller
Username: coke \
Password: coke

### Primary Driver
Username: driver \
Password: zoomzoom

--------------------------------

## File Overview

- src/index.js:
    - Renders the element defined in Presenter.js
- src/Presenter.js:
    - There is only one instance of Presenter used
	- Its responsibilities are:
		- deciding which view is visible to the user
		- preparing data for the views
		- handling transitions from one view to another
- src/constants.js:
    - Contants used throughout the project
- src/global.js
	- Variables (can change) used throughout the project
	- This is a clean way for Presenter.js to provide data to views
		- this minimizes the amount that must be passed to child components through props
- src/views
	- A folder containing all of the views
- src/components
	- A folder containing components that the views are composed of
- src/models
	- A folder with functions to access/manipulate data from other sources
	- index.js has all the functions, but delegates their implementations to backend.js and cache.js
- src/data
	- A folder with functions for packaging up data into the desired format
	- Typically, these functions make use of what is returned from functions in src/models
- src/assets
	- A folder for graphics
- public/images/bg
	- A folder for the various backgrounds our views use

--------------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
