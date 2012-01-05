/*
 * Rest Resource: split
 */

exports.index = function(req, res) {
	console.log( "split.index. req.query.document_id: " + req.query.document_id );

	if ( typeof req.query.document_id === 'undefined' ) { res.send( "URI must contain a filter for: document_id", 400 ); return; };


	res.local( 'db' ).queryForResultSet( "SELECT id, top, upper, lower FROM split_tbl WHERE document_id = $1", [req.query.document_id], function( list ) {
		res.json( list );
		console.log( "split.index. req.query.document_id: " + req.query.document_id );
	});


};

exports.create = function(req, res){
	console.log( "split.insert" );

	var fields = [ 'id', 'document_id', 'top', 'upper', 'lower' ];
	var values = [req.body.document_id, req.body.top, req.body.upper, req.body.lower];
	res.local( 'db' ).insert( 'split', fields, values, function( split_id ) {
		res.json( { "id": split_id } );
		console.log( "split.create. id: " + split_id );
	});

};

exports.update = function(req, res){
	console.log( "split.update. req.params.split: " + req.params.split );

	res.local( 'db' ).execute( "UPDATE split_tbl SET top=$1, title=$2, description=$3 WHERE id = $4", [req.body.top, req.body.upper, req.body.lower, req.params.split], function() {
		res.send(200);
		console.log( "split.update. req.params.split: " + req.params.split );
	});

};

exports.destroy = function(req, res){
	console.log( "split.destroy. req.params.split: " + req.params.split );

	res.local( 'db' ).execute( "DELETE FROM split_tbl WHERE id = $1", [req.params.split], function() {
		res.send(200);
		console.log( "split.destroy. req.params.split: " + req.params.split );
	});

};
