// Requiring necessary npm middleware packages 
const createError = require('http-errors');
const env = require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./app/config/passport");
const db = require("./app/models");
// const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const flash = require('express-flash');




// Setting up port
const PORT = process.env.PORT || 8080;
// Creating express app and configuring middleware 
//needed to read through our public folder
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('keyboard cat'));
// app.use(session({ cookie: { maxAge: 60000 }}));

app.use(flash());


//
// Requiring our routes
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);
//
//we are doing a GET to test if our server is working fine
app.get('/', function(req, res) {    
       res.send('Welcome to Passport with Sequelize and without HandleBars');
});
//
//this will listen to and show all activities on our terminal to 
//let us know what is happening in our app
// app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// //
//this will listen to and show all activities on our terminal to 
//let us know what is happening in our app
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });