/*
 * GET home page.
 */
var pg = require('pg');

exports.index = function(req, res){
	var document_id = req.query.document_id;
	var buffer = [];

	var dbClient = new pg.Client(dbConnString);
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

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();

	var idQuery = dbClient.query("SELECT NEXTVAL( 'note_seq' ) AS note_id" );
	idQuery.on('row', function(row) {
		var note_id = row.note_id;
		insertQuery = dbClient.query("INSERT INTO note_tbl( id, document_id, top, left_, description ) VALUES ( $1, $2, $3, $4, $5 )", [note_id, req.body.document_id, req.body.top, req.body.left, req.body.description] );

		insertQuery.on('end', function(row) {
			dbClient.end();
			console.log( "note.create.id: " + note_id );
			var obj = { "id": note_id };
			res.send( JSON.stringify( obj ) );
		});
		

	});

};

exports.update = function(req, res){
	console.log( "POSTDATA4: " + req.params.note + ":" + req.body.description );

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("UPDATE note_tbl SET top=$1, left_=$2, description=$3 WHERE id = $4", [req.body.top, req.body.left, req.body.description, req.params.note], function(err, result) {
		dbClient.end();
	});
 
	res.send( "Fling4" );
};


exports.destroy = function(req, res){
	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("DELETE FROM note_tbl WHERE id = $1", [req.params.note], function(err, result) {
		dbClient.end();
	});

	console.log( "DELETE FROM note_tbl WHERE id = $1. " + req.params.note );
	
	var obj = { "id": req.params.card };
	res.json( obj );

	};
