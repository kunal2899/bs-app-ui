# Book Selling App

This project is the front-end part of app. For back-end part, please refer to [bs-app-api](https://github.com/kunal2899/bs-app-api#readme) repository.\
🚀 Live on [https://book-selling-app.herokuapp.com](https://book-selling-app.herokuapp.com)


## Requirements

You only need Node.js, git and a node global package installed in your environment for development.

### Git installation
  Download the installer package from [here](https://git-scm.com).


### Node installation
  #### Windows

  Simply download the installer package from the official [Node.js](https://nodejs.org/) website.\
  As `npm` might require it, make sure `git` is accessible in your PATH.

  #### Linux

  Run the following commands on your terminal to quickly and easily install `nodejs` and `npm` with `apt install`

      $ sudo apt install nodejs
      $ sudo apt install npm

  #### Other Operating Systems
  On the official [Node.js](https://nodejs.org/en/download/) and [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) websites, you can get more details regarding the installation process for other operating systems.

You should be able to run the following commands on your terminal if the installation went well.

    $ node --version
    v14.15.0

    $ npm --version
    6.14.8

In case you need to update `npm`, you can make it by running the following command on your terminal

    $ npm install npm -g
    
## Setup
 #### Cloning github repository
 
    $ git clone https://github.com/kunal2899/bs-app-ui
    $ cd bs-app-ui
    
 #### Install packages
 
    $ npm install
    
 #### Configure your app environment
 Create `.env` file in your root folder and update with your local settings.
 
    REACT_BASE_API_BASE_URL = LOCAL_API_URL_IF_ANY (default is https://book-selling-app-api.herokuapp.com/api)
    
 #### Run the project
    $ npm start

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
