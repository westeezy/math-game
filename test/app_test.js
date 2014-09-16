'use strict';

var request = require('supertest'),
    app = require('../server');

describe('route index', function() {
    it('should return a successfully', function(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});