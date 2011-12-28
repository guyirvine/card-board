
/**
 * Module dependencies.
 */
/*
GET     /forums              ->  index
GET     /forums/new          ->  new
POST    /forums              ->  create
GET     /forums/:forum       ->  show
GET     /forums/:forum/edit  ->  edit
PUT     /forums/:forum       ->  update
DELETE  /forums/:forum       ->  destroy
*/

var express = require('express')
  , Resource = require('express-resource')
  , app = module.exports = express.createServer()
  , pg = require('pg');
  
var dbClient = new pg.Client("tcp://postgres:1234@localhost/card-board");
dbClient.connect();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
//queries are queued and executed one after another once the connection becomes available
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.resource('note', require('./routes/note'));
app.resource('card', require('./routes/card'));

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
