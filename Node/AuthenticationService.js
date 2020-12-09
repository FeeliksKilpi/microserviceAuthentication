const express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser');
const app = express()
const port = 3000

// Use http request bodyparser to get data from request's body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Test endpoint that logs requesters headers.
app.get("/", (req, res) => {
  console.log(req.headers);
  res.status(404).end();
});

// endpoint that should list users from MongoDB database
app.get('/users', async function(req, res) {
  console.log("Returning list of users");
  let users = listAllUsers();
  res.json(users);
});

// Endpoint that recieves user credentials and authenticates them via handleAuth
app.post('/authenticate', (req, res) => {
  const { handleLogin, handleLogout } = require('./handleAuth');
  let email = req.body.email;
  let password = req.body.password;
  handleLogin(email, password);
  res.status(200).json({status: "success"}).send();
  //handleLogout();
});

// Run app on port 3000
app.listen(port, () => {
  console.log(`Authentication server running at: http://localhost:${port}`)
})

// To request authentication with curl, try the following example:
//curl -d '{"user":"felix@gmail.com", "password":"kokeilu"}' -H "Content-Type: application/json" -X POST http://localhost:3000/authenticate