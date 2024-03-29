/*
 * INSTRUCTIONS
 *
 * run the site at localhost, port 3000
 *
 * run vows --spec test/api-document.js
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
  'document#index': {
    topic: function(){
      common.get('document', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})


.addBatch({
	'document#show': {
		topic: function(){
			common.get('document/-1', {}, this.callback)
		},
		'should be 200': common.assertStatus(200),
		'should have JSON header' : common.assertJSONHead(),
		'body is valid JSON' : common.assertValidJSON(),
		'body is valid device' : function() {
			return function(res, b ){
				var obj = { 'id': -1,
							'title': 'Test Document',
							};
				
				assert.equal( JSON.stringify( res.body ), JSON.stringify( obj ) )
			}
		}(),
	},
})


.addBatch({
  'document#create': {
    topic: function(){
	var obj = { "title": 'title'
				};
      common.post('document', obj, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})

//suite.run( )
suite.export( module )
