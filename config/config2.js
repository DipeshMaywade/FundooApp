const mongoose = require('mongoose');
const blueBird = require('bluebird');
require('dotenv').config();

function MongoDBAdapter(uri, options) {
  this.uri = uri;
  this.options = options;
}

MongoDBAdapter.prototype.addConnectionListener = function (event, cb) {
  var listeners = mongoose.connection._events;
  if (!listeners || !listeners[event] || listeners[event].length === 0) {
    mongoose.connection.once(event, cb.bind(this));
  }
};

MongoDBAdapter.prototype.connect = function () {
  return new blueBird(
    function (resolve, reject) {
      if (isState('connected')) {
        console.log('DEBUG_ALREADY_CONNECTED', this.uri);
        return resolve(this.uri);
      }

      //   this.addConnectionListener('error', function (err) {
      //     d(DEBUG_CONNECTION_ERROR, this.uri);
      //     return reject(err);
      //   });

      //   this.addConnectionListener('open', function () {
      //     d(DEBUG_CONNECTED, this.uri);
      //     return resolve(this.uri);
      //   });

      //   if (isState('connecting')) {
      //     d(DEBUG_ALREADY_CONNECTING, this.uri);
      //   } else {
      //     d(DEBUG_CONNECTING, this.uri);
      //     mongoose.connect(this.uri, this.options);
      //   }
    }.bind(this)
  );
};
module.exports = MongoDBAdapter;
