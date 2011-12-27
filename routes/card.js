/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log( "CARD2: " + req.body.description );

	res.send( "Fling2" );
};

exports.create = function(req, res){
	console.log( "CARD3: " + req.body.description );

	res.send( "Fling3" );
};

exports.update = function(req, res){
	console.log( "CARD4: " + req.body.left + ":" + req.body.title + ":" + req.body.description );

	res.send( "CARD4: " + req.body.left + ":" + req.body.title + ":" + req.body.description );
};
