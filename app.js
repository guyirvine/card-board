
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
  , routes = require('./routes')
  , Resource = require('express-resource')
  , app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
/*
app.post('/msg.htm', function( request, res ) {
	console.log( "POSTDATA: " + request.body.description );
	
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
		var obj = JSON.parse(body);
		console.log( "POSTDATA: " + obj.description );
            // use POST

        });
    
	res.send( "Fling" );
});
*/

app.get('/', routes.index);
app.resource('note', require('./routes/note'));

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
