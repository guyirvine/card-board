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
      common.get('note', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
    'should have JSON header' : common.assertJSONHead(),
    'body is valid JSON' : common.assertValidJSON(),
  },
})

.addBatch({
  'note#delete': {
    topic: function(){
      common.del('note/1', {}, this.callback)
    },
    'should be 200': common.assertStatus(200),
  },
});

//suite.run( )
suite.export( module )
