var providers = ['github', 'facebook']

var Auth = function (ref) {
  this.ref = ref;

  this.onAuth(function (authData) {
    if (authData) {
      ref.child("users").child(authData.uid).once('value', function (dataSnapshot) {
        if (!dataSnapshot.child("name").exists()) {
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: getName(authData)
          });
        }
      });
    }
  });

}

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
  this.ref.onAuth(function (authData) {
    if (authData) {
      callback(authData);
    }
  })
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
