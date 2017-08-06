// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var nodemailer = require("nodemailer");
var path = require("path")
// *** Dependencies
// =============================================================
var bodyParser = require("body-parser");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("./public"));

if (PORT === 3000) {
    var authentication = require("./config/authentication.js");
} else {
    console.log("Heroku connection");
    var authentication = process.env
};

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: authentication.user,
      pass: authentication.pass
    }
});


// Routes =============================================================
app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.post("/email", function(req, res) {
    var emailObj = {
        to: "michellemdidier@gmail.com",
        subject: "Hello from michelledidier.com!",
        text: req.body.text,
        html: "<b>Sender: </b>" + req.body.from + "<br> <b>Email: </b>" + req.body.address + "<p>" + "<hr />" + req.body.text + "</p>"
    }
    console.log("Message: " + emailObj.text);
    smtpTransport.sendMail(emailObj, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message successfully sent from: " + req.body.address);
            res.send("buffalochicken");
        }
    });
});

app.listen(PORT, function() {
  console.log(`Server running http://localhost:${PORT}, Ctrl + c to stop`);
});