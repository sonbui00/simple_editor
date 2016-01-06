var Firebase = require('firebase');
var Auth = require('./auth');


var rootRef = new Firebase('https://editor-code4startup.firebaseio.com');
var auth = new Auth(rootRef);

module.exports = {

  getRef: function(path) {
    return rootRef;
  },
  getAuth: function() {
    return auth;
  }
}



