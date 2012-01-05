/*
 * INSTRUCTIONS
 *
 * run the site at localhost, port 3000
 *
 * run vows --spec test/api-card.js
 *
 */

var request = require('request'),
    vows = require('vows'),
    assert = require('assert'),
    cookie = null,
    common = require('test-api-common')


// TODO include unauthed tests
var suite = vows.describe('API Localhost HTTP Tests')

// Very first test!
.addBatch({
  "Server should be UP as in: var apiUrl": {
    topic: function(){
      common.get('', {} ,this.callback )
    },

    '/ should repond something' : function(res, b){
      assert.ok(res.body)
    }
  }
})


.addBatch({
	'split#index': {
		topic: function(){
			common.get('split/?document_id=-1', {}, this.callback)
		},
		'should be 200': common.assertStatus(200),
		'should have JSON header' : common.assertJSONHead(),
		'body is valid JSON' : common.assertValidJSON(),
	},
})


.addBatch({
	'split#index without document filter': {
		topic: function(){
			common.get('split/', {}, this.callback)
		},
		'should be 400': common.assertStatus(400),
		'body is valid msg' : function() {
			return function(res, b ){
				assert.equal( res.body, "URI must contain a filter for: document_id" )
			}
		}(),
	},
})


.addBatch({
	'split#create': {
		topic: function(){
			var obj = { "document_id": '-1',
						"top": '-2',
						"upper": '-3',
						"lower": '-4',
						};
			common.post('split', obj, this.callback)
		},
		'should be 200': common.assertStatus(200),
		'should have JSON header' : common.assertJSONHead(),
		'body is valid JSON' : common.assertValidJSON(),
		'should return new id' : common.assertReturnedIdValid(),
	},
})


.addBatch({
  'split#delete': {
    topic: function(){
      common.del('split/-2', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
  },
});

//suite.run( )
suite.export( module )
