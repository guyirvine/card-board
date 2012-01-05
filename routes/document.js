/*
 * Rest Resource: document
 */

exports.index = function(req, res){
	console.log( "document.index." );

	res.local( 'db' ).queryForResultSet( "SELECT id, title FROM document_tbl", [], function( list ) {
		res.json( list );
		console.log( "document.index." );
	});

};

exports.show = function(req, res){
	console.log( "document.show. " + req.params.document );

	res.local( 'db' ).queryForRow( "SELECT id, title FROM document_tbl WHERE id = $1", [req.params.document], function( row ) {
		if ( typeof row === 'undefined' ) { res.send( 404 ); return; };


		res.json( row );
		console.log( "document.show. " + req.params.document );
	});


};


exports.create = function(req, res){
	console.log( "reading.insert" );

	var fields = [ 'id', 'title' ];
	var values = [req.body.title];
	res.local( 'db' ).insert( 'document', fields, values, function( document_id ) {
		res.json( { "id": document_id } );
		console.log( "document.create. id: " + document_id );
	});


};

exports.update = function(req, res) {
	console.log( "document.update. req.params.document: " + req.params.document );

	res.local( 'db' ).execute( "UPDATE document_tbl SET title=$1 WHERE id = $2", [req.body.title, req.params.document], function() {
		res.json( { "id": req.params.document } );
		console.log( "document.update. req.params.document: " + req.params.document );
	});

};

