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
	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();

	var idQuery = dbClient.query("SELECT NEXTVAL( 'split_seq' ) AS split_id" );
	idQuery.on('row', function(row) {
		var split_id = row.split_id;
		insertQuery = dbClient.query("INSERT INTO split_tbl( id, document_id, top, upper, lower ) VALUES ( $1, $2, $3, $4, $5 )", [split_id, req.body.document_id, req.body.top, req.body.upper, req.body.lower] );

		insertQuery.on('end', function(row) {
			dbClient.end();
			console.log( "split.create.id: " + split_id );
			var obj = { "id": split_id };
			res.send( JSON.stringify( obj ) );
		});
		

	});

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

exports.destroy = function(req, res){
	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("DELETE FROM split_tbl WHERE id = $1", [req.params.split], function(err, result) {
		dbClient.end();
	});

	console.log( "DELETE FROM split_tbl WHERE id = $1. " + req.params.split );
	
	var obj = { "id": req.params.card };
	res.json( obj );

	};
