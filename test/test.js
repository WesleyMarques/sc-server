var assert = require('assert');

describe('Array', function() {
  describe('#indexOf2()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

var util = require('./util.js');
var request = require('supertest');
var should = require('should');
var app = require('../index').app;

describe('Endpoint /api/user test. ', function() {
  it('/api/', function(done) {
    request(app)
      .get('/api/user/1')
      .expect(200)
      .end(function(err, info) {
        should.not.exist(err);
        done();
      });
  });
});
