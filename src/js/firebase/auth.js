var EventEmitter = require('events').EventEmitter;
var util         = require('util');

var providers = ['github', 'facebook']

var Auth = function (ref) {
  var self = this;
  this.ref = ref;

  this.onAuth(function (authData) {
    if (authData) {
      ref.child("users").child(authData.uid).once('value', function (dataSnapshot) {
        if (!dataSnapshot.child("name").exists()) {
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: getName(authData)
          }, function (error) {
            if (!error) {
              self.userName = getName(authData);
            }
          });
        } else {
          self.userName = dataSnapshot.child("name").val();
        }
        self.userId = authData.uid;
        self.emit('login success', self);
      });
    } else {

    }
  });
}

util.inherits(Auth, EventEmitter);

Auth.prototype.auth = function (provider, callback) {
  return this.ref.authWithOAuthPopup(provider, callback);
}

Auth.prototype.unauth = function () {
  return this.ref.unauth();
}

Auth.prototype.getProviders = function () {
  return providers;
}

Auth.prototype.onAuth = function(callback) {
  return this.ref.onAuth(callback);
}

Auth.prototype.onLoginSuccess = function(callback) {
  this.on('login success', callback);
}

Auth.prototype.onLogoutSuccess = function(callback) {
  this.ref.onAuth(function (authData) {
    if (!authData) {
      callback();
    }
  })
}

function getName(authData) {
  switch (authData.provider) {
    case 'github':
      return authData.github.displayName || authData.github.username;
    case 'facebook':
      return authData.facebook.displayName;
  }
}

module.exports = Auth;
