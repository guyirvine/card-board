/*
 * GET home page.
 */
var pg = require('pg');

exports.index = function(req, res){
	var document_id = req.query.document_id;
	var buffer = [];

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	var query = dbClient.query("SELECT id, top, left_, title, description FROM card_tbl WHERE document_id = $1", [document_id]);

	query.on('row', function(row) {
		var obj = { 'id': row.id,
					'top': row.top,
					'left': row.left_,
					'title': row.title,
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
	console.log( "CARD3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "CARD4: " + req.params.card + ":" + req.body.left + ":" + req.body.title + ":" + req.body.description );

	var dbClient = new pg.Client(dbConnString);
	dbClient.connect();
	dbClient.query("UPDATE card_tbl SET top=$1, left_=$2, title=$3, description=$4 WHERE id = $5", [req.body.top, req.body.left, req.body.title, req.body.description, req.params.card], function(err, result) {
		dbClient.end();
	});

	console.log( "UPDATE card_tbl SET top=$1, left_=$2, title=$3, description=$4 WHERE id = $5" );
	console.log( req.body.top + ":" + req.body.left + ":" + req.body.title + ":" + req.body.description + ":" + req.params.card );
	
	res.send( "CARD4: " + req.params.card + ":" + req.body.left + ":" + req.body.title + ":" + req.body.description );

	};
