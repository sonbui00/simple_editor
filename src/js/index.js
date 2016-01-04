var Firepad  = require('./firepad');
var Firebase = require('./firebase')

firepad = Firepad.init(Firebase.getRef(), document.getElementById('firepad-container'))

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
