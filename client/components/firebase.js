import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyA_WlZzXSgGK9ruEXT6CQ9Ym-fl6iaJdEc",
	authDomain: "weconnect-9084c.firebaseapp.com",
	databaseURL: "https://weconnect-9084c.firebaseio.com",
	projectId: "weconnect-9084c",
	storageBucket: "weconnect-9084c.appspot.com",
	messagingSenderId: "897879095749"
};

firebase.initializeApp(config);
export const storage = firebase.storage().ref();
