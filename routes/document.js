/*
 * GET home page.
 */
var pg = require('pg');

exports.index = function(req, res){
	var buffer = [];

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	var query = dbClient.query("SELECT id, title FROM document_tbl", []);

	query.on('row', function(row) {
		var obj = { 'id': row.id,
					'title': row.title,
					};
		buffer.push( obj );
	});

	query.on('end', function() { 
		dbClient.end();
		res.json( buffer );
	});

	console.log( "POSTDATA2: index2: " + req.query.document_id );

};

exports.show = function(req, res){
	var document_id = req.query.document_id;
	var buffer = [];

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	var query = dbClient.query("SELECT id, title FROM document_tbl WHERE document_id = $1", [document_id]);

	query.on('row', function(row) {
		var obj = { 'id': row.id,
					'title': row.title,
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

	var idQuery = dbClient.query("SELECT NEXTVAL( 'document_seq' ) AS document_id" );
	idQuery.on('row', function(row) {
		var document_id = row.document_id;
		insertQuery = dbClient.query("INSERT INTO document_tbl( id, title ) VALUES ( $1, $2 )", [document_id, req.body.title] );

		insertQuery.on('end', function(row) {
			dbClient.end();
			console.log( "document.create.id: " + document_id );
			var obj = { "id": document_id };
			res.json( obj );
		});
		

	});

};

exports.update = function(req, res) {

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("UPDATE document_tbl SET title=$1 WHERE id = $2", [req.body.title, req.params.document], function(err, result) {
		dbClient.end();
	});

	res.send( "document4: " + req.params.document );

	};

