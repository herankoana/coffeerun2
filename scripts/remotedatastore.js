(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      // eslint-disable-next-line no-console
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    cb = function(data) {
      // eslint-disable-next-line no-console
      console.log(data);
    };

    $.get(this.serverUrl, function(serverResponse) {
      // eslint-disable-next-line no-console
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    cb = function(data) {
      // eslint-disable-next-line no-console
      console.log(data);
    };

    var url = this.serverUrl;

    $.get(url, function(serverResponse) {
      var r;
      for (var i = 0; i < serverResponse.length; i++) {
        if (serverResponse[i]["emailAddress"] == key) {
          r = serverResponse[i]["id"];
        }
      }
      $.get(url + "/" + r, function(serverResponse) {
        // eslint-disable-next-line no-console
        console.log(serverResponse);
        cb(serverResponse);
      });
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var url = this.serverUrl;

    $.get(url, function(serverResponse) {
      var r;
      for (var i = 0; i < serverResponse.length; i++) {
        if (serverResponse[i]["emailAddress"] == key) {
          r = serverResponse[i]["id"];
        }
      }
      $.ajax(url + "/" + r, {
        type: "DELETE"
      });
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
