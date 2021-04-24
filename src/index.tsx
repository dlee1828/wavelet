import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyBCm6tTXSfj5amyVVWcSLhNGrGmbc-sNW8",
	authDomain: "wavelet-f55ae.firebaseapp.com",
	projectId: "wavelet-f55ae",
	storageBucket: "wavelet-f55ae.appspot.com",
	messagingSenderId: "295979771793",
	appId: "1:295979771793:web:e52c021bac4d6864135c30",
	measurementId: "G-EXMRDTCM0C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
export { storage, firebase };

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
