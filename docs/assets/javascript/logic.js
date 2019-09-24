$(document).ready(function(){
//variables


var firebaseConfig = {
    apiKey: "AIzaSyDOTTdhYcgCi6UBUZ5a1gF4TjhX23-BWko",
    authDomain: "rps-game-8f3bc.firebaseapp.com",
    databaseURL: "https://rps-game-8f3bc.firebaseio.com",
    projectId: "rps-game-8f3bc",
    storageBucket: "rps-game-8f3bc.appspot.com",
    messagingSenderId: "744816090571",
    appId: "1:744816090571:web:73a21c122856020ffc6a4e",
    measurementId: "G-S87349LBSZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database()
});