const { firebaseConfig } = require('./credentials');
const firebase = require('firebase');
const fireauth = firebase.initializeApp(firebaseConfig);
//admin@microauth.com
//admin123
let loginStatus = false;
function handleLogin(email, password) {
    let errmsg = null;
    console.log("authorizing...");
    fireauth
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code) {
          case "auth/invalid-email":
            console.log("Error, email invalid");
            return err.message;
          case "auth/user-disabled":
            console.log("Error, user disabled");
            return err.message;
          case "auth/user-not-found":
            console.log("Error, user not found");
            return err.message;
          case "auth/wrong-password":
            console.log("Error, password invalid");
            return err.message;
        }
        
      });
    return "success";
  };

function handleLogout() {
    console.log("Logging out...");
    fireauth.auth().signOut();
};

fireauth.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log("Logged in as: " + firebaseUser.email);
    loginStatus = true;
  } else {
    console.log("Not logged in");
  }
});

//handleLogin("admin@microauth.com", "admin123");
//handleLogout();
module.exports = { handleLogin, handleLogout, loginStatus }
