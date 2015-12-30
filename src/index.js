require("bootstrap-webpack");
require('./css/style.css');
function init() {
  //// Initialize Firebase.
  var firepadRef = getExampleRef();
  // TODO: Replace above line with:
  // var firepadRef = new Firebase('<YOUR FIREBASE URL>');
  //// Create CodeMirror (with lineWrapping on).
  var codeMirror = CodeMirror(document.getElementById('firepad-container'), { lineWrapping: true });
  //// Create Firepad (with rich text toolbar and shortcuts enabled).
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
      { richTextToolbar: true, richTextShortcuts: true });
  //// Initialize contents.
  firepad.on('ready', function() {
    if (firepad.isHistoryEmpty()) {
      firepad.setHtml('<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n');
    }
  });
}
// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = new Firebase('https://firepad.firebaseio-demo.com');
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key(); // add it as a hash to the URL.
  }
  return ref;
}
init();
