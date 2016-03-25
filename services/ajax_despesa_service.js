angular.module('angularApp').factory('ajaxDespesas', function ($http) {
  var DESPESA_GET_URL = 'http://localhost:5000/despesa/';
  var DESPESA_POST_URL = 'http://localhost:5000/despesa/';
  var DESPESA_PUT_URL = 'http://localhost:5000/despesa/';
  var DESPESA_DELETE_URL = 'http://localhost:5000/despesa/';

  return {
    createDespesa: createDespesa,
    readDespesa: readDespesa,
    updateDespesa: updateDespesa,
    deleteDespesa: deleteDespesa
  }  
  //closure functions  
  function createDespesa(nova_despesa, callback) {
    $http.post(DESPESA_POST_URL, nova_despesa).then(
      function successCallback(response) {
        callback();
        return response.data;
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function readDespesa(callback) {
    $http.get(DESPESA_GET_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function updateDespesa(despesa_update, callback) {
    $http.put(DESPESA_PUT_URL, despesa_update).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

  function deleteDespesa(despesa_id, callback) {
    $http.delete(DESPESA_DELETE_URL + despesa_id).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

});