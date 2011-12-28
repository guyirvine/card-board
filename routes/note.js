/*
 * GET home page.
 */
var pg = require('pg');
var dbClient = new pg.Client("tcp://postgres:1234@localhost/card-board");
dbClient.connect();

exports.index = function(req, res){
	console.log( "POSTDATA2: " + req.body.description );

	res.send( "Fling2" );
};

exports.create = function(req, res){
	console.log( "POSTDATA3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "POSTDATA4: " + req.params.note + ":" + req.body.description );

	dbClient.query("UPDATE note_tbl SET top=$1, left_=$2, description=$3 WHERE id = $4", [req.body.top, req.body.left, req.body.description, 1]);
 
	res.send( "Fling4" );
};
