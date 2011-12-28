/*
 * GET home page.
 */
var pg = require('pg');
var dbClient = new pg.Client("tcp://postgres:1234@localhost/card-board");
dbClient.connect();

exports.index = function(req, res){
	console.log( "CARD2: " + req.body.description );

	res.send( "Fling2" );
};

exports.create = function(req, res){
	console.log( "CARD3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "CARD4: " + req.body.left + ":" + req.body.title + ":" + req.body.description );

	res.send( "CARD4: " + req.body.left + ":" + req.body.title + ":" + req.body.description );

	dbClient.query("UPDATE card_tbl SET top=$1, left_=$2, title=$3, description=$4 WHERE id = $5", [req.body.top, req.body.left, req.body.title, req.body.description, req.params.card]);

};
