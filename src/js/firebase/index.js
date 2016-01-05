var Firebase = require('firebase');

var rootRef = new Firebase('https://editor-code4startup.firebaseio.com');

module.exports = {

  getRef: function(path) {
    return rootRef;
  }
}



