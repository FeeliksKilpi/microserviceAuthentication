const { firebaseConfig } = require('./credentials');
const firebase = require('firebase');
const fireauth = firebase.initializeApp(firebaseConfig);
//admin@microauth.com
//admin123

function handleLogin(email, password) {
    console.log("authorizing...");
    fireauth
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        msg = err.message;
        switch(err.code) {
          case "auth/invalid-email":
            console.log("Error, email invalid");
          case "auth/user-disabled":
            console.log("Error, user disabled");
          case "auth/user-not-found":
            console.log("Error, user not found");
          case "auth/wrong-password":
            console.log("Error, password invalid");
        }
      });
      
  };


function handleLogout() {
    console.log("Logging out...");
    fireauth.auth().signOut();
};

fireauth.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log("Logged in as: " + firebaseUser.email);
  } 
});

//handleLogin("admin@microauth.com", "admin123");
//handleLogout();
module.exports = { handleLogin, handleLogout }
