angular.module('angularApp').factory('ajaxReceita', function ($http) {
  var RECEITA_GET_URL = 'http://localhost:5000/receita/';
  var RECEITA_POST_URL = 'http://localhost:5000/receita/';
  var RECEITA_PUT_URL = 'http://localhost:5000/receita/';
  var RECEITA_DELETE_URL = 'http://localhost:5000/receita/';

  return {
    createReceita: createReceita,
    readReceita: readReceita,
    updateReceita: updateReceita,
    deleteReceita: deleteReceita
  }  
  //closure functions  
  function createReceita(nova_receita, callback) {
    $http.post(RECEITA_POST_URL, nova_receita).then(
      function successCallback(response) {
        callback();
        return response.data;
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function readReceita(callback) {
    $http.get(RECEITA_GET_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function updateReceita(receita_update, callback) {
    $http.put(RECEITA_PUT_URL, receita_update).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

  function deleteReceita(receita_id, callback) {
    $http.delete(RECEITA_DELETE_URL + receita_id).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

});