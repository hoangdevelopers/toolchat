/**
 * Module dependencies.
 */

const express = require('express')
const path = require('path');
const session = require('express-session');
const UserManager = require("./components/usermanager");

var app = module.exports = express();
const dataFolder = './data/';
const fs = require('fs');


// config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.files = req.session.files || [];
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

var userManager = new UserManager();

app.get('/', function (req, res) {
  res.redirect('/send_message');
});

app.get('/send_message', function (req, res) {
  req.session.files = [];
  fs.readdir(dataFolder, (err, files) => {
    if (err) {
      req.session.error = 'Read file has error';
      res.redirect('back');
      return;
    }
    files.forEach(file => {
      req.session.files.push(file);
    });
    res.render('send_message');
    return;
  })
});
app.post('/send_message', function (req, res) {
  userManager.send({ ...req.body })
    .then(() => {
      req.session.success = 'Send message success!'
      res.redirect('back');
    })
    .catch((err) => {
      req.session.error = err || 'Send message fail!'
      res.redirect('back');
    })
});
/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}