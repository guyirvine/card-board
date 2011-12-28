/*
 * GET home page.
 */
var pg = require('pg');

exports.index = function(req, res){
	var document_id = req.query.document_id;
	var buffer = [];

	var dbClient = new pg.Client("tcp://postgres:1234@localhost/card-board");
	dbClient.connect();
	var query = dbClient.query("SELECT id, top, left_, description FROM note_tbl WHERE document_id = $1", [document_id]);

	query.on('row', function(row) {
		var obj = { 'id': row.id,
					'top': row.top,
					'left': row.left_,
					'description': row.description,
					};
		buffer.push( obj );
	});

	query.on('end', function() { 
		dbClient.end();
		res.json( buffer );
	});

	console.log( "POSTDATA2: index2: " + req.query.document_id );

};

exports.create = function(req, res){
	console.log( "POSTDATA3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "POSTDATA4: " + req.params.note + ":" + req.body.description );

	var dbClient = new pg.Client("tcp://postgres:1234@localhost/card-board");
	dbClient.connect();
	dbClient.query("UPDATE note_tbl SET top=$1, left_=$2, description=$3 WHERE id = $4", [req.body.top, req.body.left, req.body.description, 1]);
	dbClient.end();
 
	res.send( "Fling4" );
};
