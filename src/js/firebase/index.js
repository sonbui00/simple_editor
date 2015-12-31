var Firebase = require('firebase');

var rootRef = new Firebase('https://firepad.firebaseio-demo.com');

module.exports = {

  getRef: function(path) {
    return rootRef;
  }
}



