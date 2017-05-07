/**
 * @providesModule FirebaseConnection
 */
var firebase = require('firebase');
var config = {
  apiKey: 'AIzaSyAuZBIvBKLXea8bWX-SRiP-t5IXrDR70rg',
  authDomain: 'fluffybuttbrewery-e4de1.firebaseapp.com',
  databaseURL: 'https://fluffybuttbrewery-e4de1.firebaseio.com',
  storageBucket: 'fluffybuttbrewery-e4de1.appspot.com',
  messagingSenderId: "809970246372"
};
firebase.initializeApp(config);
firebase.auth().signInAnonymously();

var myFirebaseRef = firebase.database();

export function getEmailRef() {
  var newPostKey = myFirebaseRef.ref('emails').push().key;
  return myFirebaseRef.ref('emails/' + newPostKey)
}

export function getProductsRef() {
  return myFirebaseRef.ref('content/Products')
}

export function getContactInformationRef() {
  return myFirebaseRef.ref('content/Contact')
}
