
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log( "POSTDATA2: " + req.body.description );

	res.send( "Fling2" );
};

exports.create = function(req, res){
	console.log( "POSTDATA3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "POSTDATA4: " + req.params + ":" + req.params.note + ":" + req.body.description );

	res.send( "Fling4" );
};
