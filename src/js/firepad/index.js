var Firepad  = require('./override');
var FirepadUserList = require('./userlist')

var _Firepad = function (ref, place) {
  if (!(this instanceof _Firepad)) {
    return new _Firepad(ref, place);
  }
  this.place = place;

  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    this.ref = ref.child(hash);
  } else {
    this.ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + this.ref.key(); // add it as a hash to the URL.
  }

  // Create Ace
  var aceEditor = ace.edit('firepad-container');
  aceEditor.setTheme("ace/theme/textmate");
  var session = aceEditor.getSession();
  session.setUseWrapMode(true);
  session.setUseWorker(false);
  session.setMode("ace/mode/javascript");

  firepad = Firepad.fromACE(this.ref, aceEditor, {
    defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
  });

  this.intance = firepad;

  // Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
  var userId = this.intance.firebaseAdapter_.userId_;

  //// Create FirepadUserList (with our desired userId).
  this.userList = FirepadUserList.fromDiv(this.ref.child('users'),
                                            document.getElementById('userlist'), userId);
}

_Firepad.init = _Firepad;

_Firepad.prototype.getUserId = function() {
  return this.intance.firebaseAdapter_.userId_;
}

module.exports = _Firepad;
