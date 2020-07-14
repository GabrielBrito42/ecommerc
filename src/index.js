import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


var config = {
	apiKey: "AIzaSyDj9jy4kN25vQiBpuR5UX2rFNZETW8g1DI",
    authDomain: "react-52c22.firebaseapp.com",
    databaseURL: "https://react-52c22.firebaseio.com",
    projectId: "react-52c22",
    storageBucket: "react-52c22.appspot.com",
    messagingSenderId: "810012317522",
    appId: "1:810012317522:web:8c36eecb3567a02cb94c8b",
    measurementId: "G-Y4XGJPB6HC"
}
firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
