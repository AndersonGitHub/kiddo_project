angular.module('angularApp', ['ngRoute', 'ngAnimate']);

angular.module('angularApp')
	.config(function ($routeProvider) {
		$routeProvider
				
			.when('/', {
				templateUrl: 'partials/table_playground.html',
				controller: 'playgroundController'
			})
      
      .when('/form_pagamento', {
				templateUrl: 'partials/form_pagamento.html',
				controller: 'pagamentoController'
			})
		
			.when('/form_cadastro', {
				templateUrl: 'partials/form_cadastro.html',
				controller: 'cadastroController'
			})
      .when('/form_precos', {
				templateUrl: 'partials/form_precos.html',
				controller: 'precosController'
			})
		
			.when('/table_clientes', {
				templateUrl: 'partials/table_clientes.html',
				controller: 'clientesController'
			})
      .when('/form_despesas', {
				templateUrl: 'partials/form_despesas.html',
				controller: 'despesasController'
			})
      
      .when('/table_historico', {
				templateUrl: 'partials/table_historico.html',
				controller: 'historicoController'
			})
      .when('/table_relatorio', {
				templateUrl: 'partials/table_relatorio.html',
				controller: 'relatorioController'
			});      
	});
  
angular.module('angularApp').directive('myTable', function () {
  return {    
    restrict: 'E',
    replace: 'true',
    templateUrl: "partials/table.html"
  };
});

angular.module('angularApp').directive('myForm', function () {
  return {    
    restrict: 'E',
    replace: 'true',
    templateUrl: "partials/form.html"
  };
});

angular.module('angularApp').directive('home', function () {
  return {    
    restrict: 'E',
    replace: 'true',
    templateUrl: "partials/home.html"
  };
});


angular.module('angularApp').factory('ajaxService', function ($http) {
  var DOC_REST_URL = 'http://localhost:5000/doc/';

  return {
    createDoc: createDoc,
    readDoc: readDoc,
    updateDoc: updateDoc,
    deleteDoc: deleteDoc
  }
      
  function createDoc(new_doc, callback) {
    $http.post(DOC_REST_URL, new_doc).then(
      function successCallback(response) {
        callback();
        return response.data;
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function readDoc(callback) {
    $http.get(DOC_REST_URL).then(
      function successCallback(response) {
        callback(response.data);
      }, function errorCallback(response) {
        return response.status;
      });
  };

  function updateDoc(doc_update, callback) {
    $http.put(DOC_REST_URL, doc_update).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

  function deleteDoc(document_id, callback) {
    $http.delete(DOC_REST_URL + document_id).success(
      function (response) {
        callback();
        return response.status;
      }).error(function (response) {
        return response.status;
      });
  };

});


angular.module('angularApp').controller('playgroundController', function ($scope) {
  $scope.pageClass = 'playground-class';
    
});

angular.module('angularApp').controller('pagamentoController', function ($scope) {
  $scope.pageClass = 'pagamento-class';
});

angular.module('angularApp').controller('cadastroController', function ($scope) {
  $scope.pageClass = 'cadastro-class';
});

angular.module('angularApp').controller('clientesController', function ($scope) {
  $scope.pageClass = 'clientes-class';
});

angular.module('angularApp').controller('despesasController', function ($scope) {
  $scope.pageClass = 'despesas-class';
});

angular.module('angularApp').controller('historicoController', function ($scope) {
  $scope.pageClass = 'historico-class';
});

angular.module('angularApp').controller('relatorioController', function ($scope) {
  $scope.pageClass = 'relatorio-class';
});

angular.module('angularApp').controller('precosController', function ($scope) {
  $scope.pageClass = 'precos-class';
});

angular.module('angularApp').controller('mainController', function ($scope, ajaxService) {
	$scope.docs = [];
  $scope.selected_order = "";
  $scope.filter = "";
  $scope.checked = -1;
  $scope.order = function (order) {
    $scope.selected_order = order;
  };
  $scope.change_index = function (index) {
    if ($scope.checked == index) {
      $scope.checked = -1;
    } else {
      $scope.checked = index;
    }
  };  

  function list_docs() {
    ajaxService.readDoc(function (data) {
      $scope.docs.length = 0;
      $scope.docs = data;
    });
  };
  
  list_docs();  

  $scope.insert_doc = function () {
    var new_doc = {
      attribute_1: angular.copy($scope.document.attribute_1),
      attribute_2: angular.copy($scope.document.attribute_2),
      attribute_3: angular.copy($scope.document.attribute_3)      
    };
    ajaxService.createDoc(new_doc, function () {
      list_docs();
      delete $scope.document;
    });
  };

  $scope.update_doc = function (document) {        
    ajaxService.updateDoc(angular.copy(document), function () {
      list_docs();
    });
  };

  $scope.delete_doc = function (id) {
    ajaxService.deleteDoc(id, function () {
      list_docs();
    });
  };
	
});