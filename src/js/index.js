var Firepad  = require('./firepad');
var Firebase = require('./firebase')

var auth = Firebase.getAuth();

auth.onLoginSuccess(function(auth) {
  firepad = Firepad.init(Firebase.getRef(), document.getElementById('firepad-container'), auth.userId, auth.userName);
  $('#sidebar .item.user .text').text('User');
  $('#user-modal').modal('hide');
  $('#login-layer').hide();
  $('#logout-layer').show();
});

auth.onLogoutSuccess(function(authData) {
  $('#sidebar .item.user .text').text('Login');
  $('#user-modal').modal('hide');
  $('#login-layer').show();
  $('#logout-layer').hide();
  $('#firepad-container').replaceWith('<div id="firepad-container"></div>');
  $('#userlist').html('');
});

auth.getProviders().forEach(function (provider) {
  $('.login.' + provider).click(function() {
    auth.auth(provider, function (error, data) {
      if (error) {
      }
    });
  });
});

$('#logout').click(function () {
  auth.unauth();
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
    webrtc.joinRoom(firepad.getId());
  });
  $(this).removeClass('play').addClass('stop');
  $(this).find('.sub_icon').removeClass('glyphicon-play-circle').addClass('glyphicon glyphicon-stop');

});
