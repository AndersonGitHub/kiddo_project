angular.module('angularApp').factory('ajaxPrecos', function ($http) {
  var CONFIG_GET_URL = 'http://localhost:5000/config/';
  var CONFIG_POST_URL = 'http://localhost:5000/config/';
  var CONFIG_PUT_URL = 'http://localhost:5000/config/';

  return {
    createConfig: createConfig,
    readConfig: readConfig,
    updateConfig: updateConfig
  }

  function createConfig(nova_config, callback) {
    $http.post(CONFIG_POST_URL, nova_config).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        callback(response.data);
      });
  };

  function readConfig(callback) {
    $http.get(CONFIG_GET_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        callback(response.data);
      }
      );
  };

  function updateConfig(config_update, callback) {
    $http.put(CONFIG_PUT_URL, config_update).success(
      function (response) {
        callback(response.data);
      }).error(function (response) {
        callback(response.data);
      });
  };


});