# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview

The source code is present in the "src" directory. The index.tsx file is the entry component that contains the application.

### Sub Folders

#### Assets
Contains resources like images, svgs, icons etc..

#### Backend 
This has the 3d renderer library file used to commuticate with the renderer application

#### Components
This folder has all the react components used in the application

#### config 
Contains the application information, layout settings like app bar height,  etc.. 

#### Custom Hooks
Custom react hooks are placed here

#### globalStyles
The css, css overrides from third party libraries are placed in the globalStyles folder and imported in index.ts file

#### Routes
As the folder name suggest routes for the pages are stored here

#### Store
Redux store files, slices, redux hooks etc..

#### Theme
Material Ui theme customization files

#### Types
Third party types for javascript for use in typescript. Should contain only d.ts files

## How to setup the project

### Building the backend library
The backend library needs to be built from the repo [vcollab enterprise app](https://github.com/srinivasamurthi/vcollab-enterprise-app.git).
To build the app project follow the steps below:
1. clone the app repo [vcollab enterprise app](https://github.com/srinivasamurthi/vcollab-enterprise-app.git).
2. clone the renderer repo [vcollab enterprise renderer](https://github.com/srinivasamurthi/vcollab-enterprise-render.git)
3. run "npm install" and "npm run build:es" to build the dist files in the "dist" directory
4. Copy the files from "dist" folder in renderer to "plugins" folder in "root folder" of app repo.
5. run "npm install" and "npm run build:esm" which produces the dist files in dist directory.
6. Copy the files in dist directory of app repo to 'src/backend' folder of vcollab-enterprise-gui project. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run deploy`

creates a distributable folder with release files that can be deployed in static sites or in server
 
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
