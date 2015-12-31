var Firepad  = require('firepad');

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
    window.location = window.location + '#' + ref.key(); // add it as a hash to the URL.
  }

  var codeMirror = CodeMirror(place);
  //// Create Ace
  // var aceEditor = ace.edit('firepad-container');
  //// Create Firepad (with rich text toolbar and shortcuts enabled).
  var firepad = Firepad.fromCodeMirror(this.ref, codeMirror,
      { richTextToolbar: true, richTextShortcuts: true });
  //// Initialize contents.
  firepad.on('ready', function() {
    if (firepad.isHistoryEmpty()) {
      firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
    }
  });

  this.intance = firepad;

}

_Firepad.init = _Firepad;

_Firepad.prototype.getUserId = function() {
  return this.intance.firebaseAdapter_.userId_;
}

module.exports = _Firepad;
