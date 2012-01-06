/*
 * Rest Resource: card
 */

exports.index = function(req, res){
	console.log( "card.index. req.query.document_id: " + req.query.document_id );

	if ( typeof req.query.document_id === 'undefined' ) { res.send( "URI must contain a filter for: document_id", 400 ); return; };


	res.local( 'db' ).queryForResultSet( "SELECT id, top, left_, title, description FROM card_tbl WHERE document_id = $1", [req.query.document_id], function( list ) {
		res.json( list );
		console.log( "card.index. req.query.document_id: " + req.query.document_id );
	});

};


exports.create = function(req, res){
	console.log( "card.insert" );

	var fields = [ 'id', 'document_id', 'top', 'left_', 'title', 'description' ];
	var values = [req.body.document_id, Math.round( req.body.top ), Math.round( req.body.left ), req.body.title, req.body.description];
	res.local( 'db' ).insert( 'card', fields, values, function( card_id ) {
		res.json( { "id": card_id } );
		console.log( "card.create. id: " + card_id );
	});

};


exports.update = function(req, res){
	console.log( "card.update. req.params.card: " + req.params.card );

	res.local( 'db' ).execute( "UPDATE card_tbl SET top=$1, left_=$2, title=$3, description=$4 WHERE id = $5", [Math.round( req.body.top ), Math.round( req.body.left ), req.body.title, req.body.description, req.params.card], function() {
		res.send(200);
	});

};


exports.destroy = function(req, res){
	console.log( "card.destroy. req.params.card: " + req.params.card );

	res.local( 'db' ).execute( "DELETE FROM card_tbl WHERE id = $1", [req.params.card], function() {
		res.send(200);
		console.log( "card.destroy. req.params.card: " + req.params.card );
	});

};
