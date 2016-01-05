var Firepad  = require('./firepad');
var Firebase = require('./firebase')

var authRef = Firebase.getRef();

$('#logout-layer').hide();

authRef.onAuth(function (authData) {
  if (authData) {
    authRef.child("users").child(authData.uid).once('value', function (dataSnapshot) {
      if (!dataSnapshot.child("name").exists()) {
        authRef.child("users").child(authData.uid).set({
          provider: authData.provider,
          name: authData.github.displayName || authData.github.username
        });
      }
    });
    firepad = Firepad.init(Firebase.getRef(), document.getElementById('firepad-container'));
    $('#sidebar .item.user .text').text('User');
    $('#login-layer').hide();
    $('#logout-layer').show();
  } else {
    $('#sidebar .item.user .text').text('Login');
    $('#login-layer').show();
    $('#logout-layer').hide();
    $('#firepad-container').replaceWith('<div id="firepad-container"></div>');
    $('#userlist').html('');
  }
});

$('.login.github').click(function () {
  authRef.authWithOAuthPopup('github', function (error, data) {
    if (error) {

      return;
    }
  });
});

$('.logout.github').click(function () {
  authRef.unauth();
});

$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("active");
});

var SimpleWebRTC = require('simplewebrtc');
var webrtc;

$("#video-chat").click(function(e) {

  if ( $(this).hasClass('stop') ) {
    $(this).removeClass('stop').addClass('play');
    $(this).find('.sub_icon').removeClass('glyphicon-stop').addClass('glyphicon-play-circle');
    webrtc.leaveRoom();
    webrtc.stopLocalVideo();
    webrtc.disconnect();
    webrtc = null;
    $('#videos').html('<video id="localVideo"></video><div id="remoteVideos"></div>');
    return;
  }

  webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true,
    // force new connect
    socketio: {
      forceNew: true
    }
  });
  // we have to wait until it's ready
  webrtc.on('readyToCall', function () {
    // you can name it anything
    webrtc.joinRoom('your awesome room name');
  });
  $(this).removeClass('play').addClass('stop');
  $(this).find('.sub_icon').removeClass('glyphicon-play-circle').addClass('glyphicon glyphicon-stop');

});
