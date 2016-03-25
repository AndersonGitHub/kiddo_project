angular.module('angularApp').factory('ajaxCadastro', function ($http) {
  
  var CADASTRO_API_URL = 'http://localhost:5000/cadastro/';
    
  return {
    createCadastro: createCadastro,
    readCadastro: readCadastro,
    updateCadastro: updateCadastro,
    deleteCadastro: deleteCadastro    
  }  
  //closure functions  
  function createCadastro(novo_cadastro, callback) {
    $http.post(CADASTRO_API_URL, novo_cadastro).then(
      function successCallback(response) {
        callback();
        return response.data;       
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function readCadastro(callback) {
    // $http({ method: 'GET', url: CADASTROS_GET_URL }).then(
    $http.get(CADASTRO_API_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function updateCadastro(cadastro_update, callback) {    
    $http.put(CADASTRO_API_URL, cadastro_update).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

  function deleteCadastro(cadastro_id, callback) {
    $http.delete(CADASTRO_API_URL + cadastro_id).success(
      function (response) {
        callback();        
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

});