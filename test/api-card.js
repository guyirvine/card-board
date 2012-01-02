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
  'card#index': {
    topic: function(){
      common.get('card', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})

.addBatch({
  'card#create': {
    topic: function(){
	var obj = { "document_id": 1,
				"top": 2,
				"left": 3,
				"title": 'title',
				"description": 'description'
				};
      common.post('card', obj, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'log response body': common.logResponseBody(),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})

//suite.run( )
suite.export( module )
