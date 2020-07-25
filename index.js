// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

async function main() {

  // Add Firebase project configuration object here
  var firebaseConfig = {
    apiKey: "AIzaSyAK11Xc0NkqWuIBYlesgjPKiFBBccOywJE",
    authDomain: "portaltutorial-bd97e.firebaseapp.com",
    databaseURL: "https://portaltutorial-bd97e.firebaseio.com",
    projectId: "portaltutorial-bd97e",
    storageBucket: "portaltutorial-bd97e.appspot.com",
    messagingSenderId: "926201573937",
    appId: "1:926201573937:web:d91e3189142d88b6f75b10",
    measurementId: "G-EYSL0K6H8T"
  };

  firebase.initializeApp(firebaseConfig);

  // FirebaseUI config
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      // Email / Password Provider.
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // Handle sign-in.
        // Return false to avoid redirect.
        return false;
      }
    }
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  startRsvpButton.addEventListener("click",
    () => {
      if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  });

  firebase.auth().onAuthStateChanged((user)=> {
    if (user) {
      startRsvpButton.textContent = "LOGOUT"
    } else {
      startRsvpButton.textContent = "RSVP"
    }
  });
}
main();

