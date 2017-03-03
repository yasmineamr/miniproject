var express = require('express');
var routes = require('./app/routes');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var DB_URL = "mongodb://localhost:27017/users";

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(session({secret:"fjd8fd7sfdbsif78Pdff7ds", resave:false, saveUninitialized:true}));
app.use(express.static(__dirname + '/public'));

// mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);
app.use(routes);

app.listen(8080);

console.log('yarab yb2a el final test');

//
