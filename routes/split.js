/*
 * GET home page.
 */
var pg = require('pg');

exports.index = function(req, res) {
	var document_id = req.query.document_id;
	var buffer = [];

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	var query = dbClient.query("SELECT id, top, upper, lower FROM split_tbl WHERE document_id = $1", [document_id]);

	query.on('row', function(row) {
		var obj = { 'id': row.id,
					'top': row.top,
					'upper': row.upper,
					'lower': row.lower,
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
	console.log( "Split: " + "UPDATE split_tbl SET top=$1, upper=$2, lower=$3 WHERE id = $4" );
	console.log( "Split: " + req.body.top + ":" + req.body.upper+ ":" + req.body.lower+ ":" + req.params.split );

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("UPDATE split_tbl SET top=$1, upper=$2, lower=$3 WHERE id = $4", [req.body.top, req.body.upper, req.body.lower, req.params.split], function(err, result) {
		dbClient.end();
	});
 
	res.send( "Fling4" );
};
