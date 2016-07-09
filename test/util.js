(function() {
  'use strict';

  var config = require('../config/env.config.js');

  process.env.NODE_ENV = 'test';

  beforeEach(function(done) {
    function clearBD() {
      for (var connection in mongoose.connection.collections) {
        mongoose.connection.collections[connection].remove();
      }
      return done();
    }

    function reconnect() {
      mongoose.connect(config.MONGO_URI, function(err) {
        if (err) {
          throw err;
        }
        return clearBD();
      });
    }

    function checkState() {
      switch (mongoose.connection.readyState) {
        case 0:
           reconnect();
           break;
         case 1:
           clearDB();
           break;
         default:
           process.nextTick(checkState);
       }
     }
     checkState();
  });

  afterEach(function (done) {
    mongoose.disconnect();
    return done();
  });
})();
