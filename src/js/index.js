var Firepad  = require('./firepad');
var Firebase = require('./firebase')
var FirepadUserList = require('./firepad/userlist')

var firepad = Firepad.init(Firebase.getRef(), document.getElementById('firepad-container'))

// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
userId = firepad.getUserId();

//// Create FirepadUserList (with our desired userId).
firepadUserList = FirepadUserList.fromDiv(firepad.ref.child('users'),
                                              document.getElementById('userlist'), userId);

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("active");
});
