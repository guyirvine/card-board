/*
 * INSTRUCTIONS
 *
 * run the site at localhost, port 3000
 *
 * run vows --spec test/api-note.js
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
  'note#index': {
    topic: function(){
      common.get('note/?document_id=-1', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})

.addBatch({
	'note#index without document filter': {
		topic: function(){
			common.get('note/', {}, this.callback)
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
  'note#delete': {
    topic: function(){
      common.del('note/-2', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
  },
})

.addBatch({
	'note#create': {
		topic: function(){
			var obj = { "document_id": '-1',
						"top": '-2',
						"left": '-2',
						"description": 'new description',
						};
			common.post('note', obj, this.callback)
		},
		'should be 200': common.assertStatus(200),
		'should have JSON header' : common.assertJSONHead(),
		'body is valid JSON' : common.assertValidJSON(),
		'should return new id' : common.assertReturnedIdValid(),
	},
})


.addBatch({
	'note#create. make sure floats are accepted for top and left.': {
		topic: function(){
			var obj = { "document_id": '-1',
						"top": '-2.1234',
						"left": '-2.1234',
						"description": 'new description',
						};
			common.post('note', obj, this.callback)
		},
		'should be 200': common.assertStatus(200),
		'should have JSON header' : common.assertJSONHead(),
		'body is valid JSON' : common.assertValidJSON(),
		'should return new id' : common.assertReturnedIdValid(),
	},
})


.addBatch({
	'note#update': {
		topic: function(){
			var obj = { "document_id": '-1',
						"top": '-2',
						"left": '-2',
						"description": 'updated description',
						};
			common.put('note/-1', obj, this.callback)
		},
		'should be 200': common.assertStatus(200),
	},
})


.addBatch({
	'note#update. make sure floats are accepted for top and left.': {
		topic: function(){
			var obj = { "document_id": '-1',
						"top": '-2.1234',
						"left": '-2.1234',
						"description": 'updated description',
						};
			common.put('note/-1', obj, this.callback)
		},
		'should be 200': common.assertStatus(200),
	},
});


//suite.run( )
suite.export( module )
