const { initializeApp } = require('firebase/app')
const { getDatabase } = require("firebase/database");
const {CONFIGS} = require("../configs.js")

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: CONFIGS.DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

module.exports = {
  db,
}