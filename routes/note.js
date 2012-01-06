/*
 * Rest Resource: note
 */

exports.index = function(req, res){
	console.log( "note.index. req.query.document_id: " + req.query.document_id );

	if ( typeof req.query.document_id === 'undefined' ) { res.send( "URI must contain a filter for: document_id", 400 ); return; };


	res.local( 'db' ).queryForResultSet( "SELECT id, top, left_, description FROM note_tbl WHERE document_id = $1", [req.query.document_id], function( list ) {
		res.json( list );
		console.log( "note.index. req.query.document_id: " + req.query.document_id );
	});

};


exports.create = function(req, res){
	console.log( "note.insert" );

	var fields = [ 'id', 'document_id', 'top', 'left_', 'description' ];
	var values = [req.body.document_id, Math.round( req.body.top ), Math.round( req.body.left ), req.body.description];
	res.local( 'db' ).insert( 'note', fields, values, function( note_id ) {
		res.json( { "id": note_id } );
		console.log( "note.create. id: " + note_id );
	});


};

exports.update = function(req, res){
	console.log( "note.update. req.params.note: " + req.params.note );

	res.local( 'db' ).execute( "UPDATE note_tbl SET top=$1, left_=$2, description=$3 WHERE id = $4", [Math.round( req.body.top ), Math.round( req.body.left ), req.body.description, req.params.note], function() {
		res.send(200);
		console.log( "note.update. req.params.note: " + req.params.note );
	});

};


exports.destroy = function(req, res){
	console.log( "note.destroy. req.params.note: " + req.params.note );

	res.local( 'db' ).execute( "DELETE FROM note_tbl WHERE id = $1", [req.params.note], function() {
		res.send(200);
		console.log( "note.destroy. req.params.note: " + req.params.note );
	});

};
