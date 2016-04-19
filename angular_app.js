angular.module('angularApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

//exemplo de diretiva com controller próprio
angular.module('angularApp').directive('pagtoDirective', function () {
  return {
    restrict: 'E',
    replace: 'true',
    templateUrl: "partials/form_pagamento.html",
    scope: {
      cadastro: '='
    },
    controller: function ($scope, modelService, ajaxCadastro) {
      $scope.model = modelService;
      $scope.calculaValor = function (player) {
        var index = player.historico.length - 1;
        if (player.historico[index].com_meia) {
          player.historico[index].adicional = $scope.model.config[0].valor_par_meias;
        } else {
          player.historico[index].adicional = 0;
        }
        player.historico[index].valor_final = (player.historico[index].valor_total - player.historico[index].desconto + player.historico[index].adicional);
        player.historico[index].troco = (player.historico[index].valor_pago - player.historico[index].valor_final);
      };
      $scope.efetuaPagamento = function (cadastro) {
        //if (cadastro.historico[cadastro.historico.length - 1].pago == false) {
        var last_index = cadastro.historico.length - 1;
        cadastro.historico[last_index].pago = true;
        ajaxCadastro.updateCadastro(cadastro, function () {
          listaCadastros();
        });
        //} else {
        //  $scope.modals.open_cant_calculate_dialog();
        // }

      };
      function listaCadastros() {
        //passar função callback para o ajax service
        ajaxCadastro.readCadastro(function (data) {
          modelService.cadastros = data;
          modelService.players.length = 0;
          modelService.cadastros.forEach(function (cadastro) {
            if (cadastro.brincando == true || cadastro.standing_by == true) {
              modelService.players.push(cadastro);
            }
          });
        });
      };

    }
  };
});

angular.module('angularApp').config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/table_playground.html',
      controller: 'mainController'
    })
    .when('/form_cadastro', {
      templateUrl: 'partials/form_cadastro.html',
      controller: 'mainController'
    })
    .when('/form_precos', {
      templateUrl: 'partials/form_precos.html',
      controller: 'mainController'
    })
    .when('/table_clientes', {
      templateUrl: 'partials/table_clientes.html',
      controller: 'mainController'
    })
    .when('/form_despesas', {
      templateUrl: 'partials/form_despesas.html',
      controller: 'mainController'
    })
    .when('/table_historico', {
      templateUrl: 'partials/table_historico.html',
      controller: 'mainController'
    })
    .when('/table_relatorio', {
      templateUrl: 'partials/table_relatorio.html',
      controller: 'mainController'
    });
});


// angular.module('angularApp').controller('playgroundController', function ($scope, ajaxPlayground) {
//   $scope.pageClass = 'playground-class';
// 
// });
// 
// angular.module('angularApp').controller('pagamentoController', function ($scope, ajaxPagamento) {
//   $scope.pageClass = 'pagamento-class';
// });
// 
// angular.module('angularApp').controller('cadastroController', function ($scope, ajaxCadastro) {
//   $scope.pageClass = 'cadastro-class';
// });
// 
// angular.module('angularApp').controller('clientesController', function ($scope, ajaxClientes) {
//   $scope.pageClass = 'clientes-class';
// });
// 
// angular.module('angularApp').controller('despesasController', function ($scope, ajaxDespesas) {
//   $scope.pageClass = 'despesas-class';
// });
// 
// angular.module('angularApp').controller('historicoController', function ($scope, ajaxHistorico) {
//   $scope.pageClass = 'historico-class';
// });
// 
// angular.module('angularApp').controller('relatorioController', function ($scope, ajaxRelatorio) {
//   $scope.pageClass = 'relatorio-class';
// });
// 
// angular.module('angularApp').controller('precosController', function ($scope, ajaxPrecos) {
//   $scope.pageClass = 'precos-class';
// });

angular.module('angularApp').controller('mainController', function ($scope, $http, $timeout, $interval, $routeParams,
  modelService, ajaxCadastro, ajaxPrecos, ajaxDespesas, ajaxReceita, $location) {

  $scope.model = modelService;

  $scope.pageClass = 'default-class';

  $scope.partial = false;

  $scope.isCollapsed = true;

  $scope.showPartial = function () {
    if ($scope.partial) {
      $scope.partial = false;
    } else {
      $scope.partial = true;
    }
  }

  listaCadastros();
  getConfiguracao();
  listaDespesas();
  listaReceita();

  //calculo para pagamento
  $scope.calculaValor = function (player) {
    var index = player.historico.length - 1;
    if (player.historico[index].com_meia) {
      player.historico[index].adicional = $scope.model.config[0].valor_par_meias;
    } else {
      player.historico[index].adicional = 0;
    }
    player.historico[index].valor_final = (player.historico[index].valor_total - player.historico[index].desconto + player.historico[index].adicional);
    player.historico[index].troco = (player.historico[index].valor_pago - player.historico[index].valor_final);
  }; 
  
  //progress bar
  var updateProgressBar = function () {
    $scope.model.players.forEach(function (player) {
      if (player.brincando || player.standing_by) {
        var inicio = Date.parse(player.historico[player.historico.length - 1].inicio);
        var fim = Date.parse(player.historico[player.historico.length - 1].fim);
        var agora = Date.now();

        var tempo_total_millis = (fim - inicio);
        var tempo_decorrido_millis = (agora - inicio);
          
        //*******
        var hora_millis = (60000 * 60);
        var minuto_millis = 60000;
        var tempo_restante_millis = (fim - agora);
        var tempo_restante = new Date();
        tempo_restante.setHours(Math.floor(tempo_restante_millis / hora_millis), Math.floor(tempo_restante_millis / minuto_millis));
        var progresso = Math.round((tempo_decorrido_millis * 100) / tempo_total_millis);
        if (progresso < 100) {
          player.historico[player.historico.length - 1].progresso = progresso;
          player.historico[player.historico.length - 1].tempo_restante = tempo_restante;
        } else if (progresso < 0) {
          player.historico[player.historico.length - 1].progresso = 0;
          player.historico[player.historico.length - 1].tempo_restante = tempo_restante;
        } else {
          player.historico[player.historico.length - 1].progresso = 100;
          player.historico[player.historico.length - 1].tempo_restante = tempo_restante;
        }
      }
    });
  };

  $timeout(updateProgressBar, 0);
  $interval(updateProgressBar, 5000);

  function get_data_selecionada() {
    var dia = Number(angular.copy($scope.model.calendario.dia));
    var mes = Number(angular.copy($scope.model.calendario.mes));
    var ano = Number(angular.copy($scope.model.calendario.ano));
    var data_nascimento = new Date();
    data_nascimento.setDate(dia);
    data_nascimento.setMonth(mes - 1);
    data_nascimento.setFullYear(ano);
    return data_nascimento;
  };

  function formata_data(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  $scope.filtra_receita_por_data = function () {    
    var data = get_data_selecionada();
    $scope.model.filtro_receita = formata_data(data);       
  };
  
  $scope.update_total_receita = function () {
    $scope.model.total_receita = 0;
    $scope.model.f_receitas.forEach(function (receita) {
      $scope.model.total_receita += receita.valor;      
    });
  };
  
  $scope.filtra_despesa_por_data = function () {
    var data = get_data_selecionada();
    $scope.model.filtro_despesa = formata_data(data);
  };
  
  $scope.update_total_despesa = function () {
    $scope.model.total_despesa = 0;
    $scope.model.f_despesas.forEach(function (despesa) {
      $scope.model.total_despesa += despesa.valor;      
    });
  };

  $scope.adicionaCadastro = function (novo_cadastro) {
    novo_cadastro.dn_crianca = get_data_selecionada();
    novo_cadastro.brincando = false;
    novo_cadastro.historico = [];
    if (novo_cadastro.standing_by == true) {      
      //historico
      var novo_historico = {
        data: new Date(),
        inicio: new Date(),
        fim: new Date(),
        tempo_restante: new Date(),
        valor_total: 0,
        valor_final: 0,
        desconto: 0,
        valor_pago: 0,
        troco: 0,
        com_meia: false,
        adicional: 0,
        forma_pagamento: '',
        pago: false,
        progresso: 0
      };
      novo_cadastro.historico.push(novo_historico);
      ajaxCadastro.createCadastro(novo_cadastro, function () {
        delete $scope.cadastro;
        delete $scope.model.calendario;
        listaCadastros();
      });
    } else {
      novo_cadastro.standing_by = false;
      ajaxCadastro.createCadastro(novo_cadastro, function () {
        delete $scope.cadastro;
        delete $scope.model.calendario;
        listaCadastros();
      });
    }
  };

  $scope.atualizaCadastro = function (cadastro) {
    ajaxCadastro.updateCadastro(cadastro, function () {
      delete $scope.model.calendario;
      listaCadastros();
    });
  };

  $scope.standBy = function (cadastro) {
    if (cadastro.standing_by == false) {
      cadastro.standing_by = true;
      //historico      
      var novo_historico = {
        data: new Date(),
        inicio: new Date(),
        fim: new Date(),
        tempo_restante: new Date(),
        valor_total: 0,
        valor_final: 0,//valor a pagar
        desconto: 0,
        valor_pago: 0,
        troco: 0,
        com_meia: false,
        adicional: 0,
        forma_pagamento: '',
        pago: false,
        progresso: 0
      };
      cadastro.historico.push(novo_historico);
      ajaxCadastro.updateCadastro(cadastro, function () {
        listaCadastros();
        $location.path('/');
      });
    }
  };

  function hora_valida() {
    if ($scope.model.fim.hora > $scope.model.inicio.hora) {
      return true;
    } else if ($scope.model.fim.hora == $scope.model.inicio.hora) {
      if ($scope.model.fim.minuto > $scope.model.inicio.minuto) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  $scope.iniciaBrincadeira = function (cadastro) {
    if (cadastro.brincando == false && cadastro.standing_by == true) {
      if (hora_valida()) {
        cadastro.brincando = true;
        cadastro.standing_by = false;
        var last_index = (cadastro.historico.length) - 1;

        var inicio = new Date();//.setHours(inicio.hora, inicio.minuto);
        inicio.setHours(angular.copy($scope.model.inicio.hora), angular.copy($scope.model.inicio.minuto));
        var fim = new Date();//.setHours(fim.hora, fim.minuto);
        fim.setHours(angular.copy($scope.model.fim.hora), angular.copy($scope.model.fim.minuto));

        var minuto_milis = 60000;

        var tempo_total_milis = fim.getTime() - inicio.getTime();
        var tempo_total_min = tempo_total_milis / minuto_milis;
        var valor_minuto = $scope.model.config[$scope.model.config.length - 1].valor_hora / 60;
        // var valor_total = Math.round(valor_minuto * tempo_total_min);
        var valor_total = valor_minuto * tempo_total_min;

        cadastro.historico[last_index].inicio = inicio;
        cadastro.historico[last_index].fim = fim;
        cadastro.historico[last_index].valor_total = valor_total;
        cadastro.historico[last_index].valor_final = valor_total;

        ajaxCadastro.updateCadastro(cadastro, function () {
          delete $scope.model.calendario;
          listaCadastros();
        });
      } else {
        //criar tela modal
        window.alert("Hora final deve ser maior que hora inicial");
      }
    }
  };

  $scope.adicionaTempo = function (cadastro) {
    if (cadastro.brincando == true) {
      var last_index = (cadastro.historico.length) - 1;            
      //adicionando 15 minutos ao tempo final:      
      var novo_tempo_final_milis = (new Date(cadastro.historico[last_index].fim)).getTime() + 15 * 60000;
      var tempo_total_milis = novo_tempo_final_milis - new Date(cadastro.historico[last_index].inicio).getTime();
      var tempo_total_min = tempo_total_milis / 60000;
      var valor_minuto = $scope.model.config[$scope.model.config.length - 1].valor_hora / 60;
      // var novo_valor_total = Math.round(valor_minuto * tempo_total_min);      
      var novo_valor_total = valor_minuto * tempo_total_min;
      cadastro.historico[last_index].fim = new Date(novo_tempo_final_milis);
      cadastro.historico[last_index].valor_total = novo_valor_total;
      cadastro.historico[last_index].valor_final = novo_valor_total;
      ajaxCadastro.updateCadastro(cadastro, function () {
        listaCadastros();
      });
    }
  };

  // $scope.abreTelaPagamento = function () {
  //   if (cadastro.standing_by == false) {
  //     $scope.calculaValor(cadastro);
  //     $scope.modals.open_modal_pagamento(cadastro);
  //     $scope.$digest();
  //   } else {
  //     $scope.modals.open_cant_calculate_dialog();
  //   }
  // };

  // $scope.abreTelaPagamentoAdd = function (cadastro) {
  //   $scope.modals.open_modal_pagamento_add(cadastro);
  // };

  //   $scope.efetuaPagamento = function (cadastro) {
  //     //if (cadastro.historico[cadastro.historico.length - 1].pago == false) {
  //     var last_index = cadastro.historico.length - 1;
  //     cadastro.historico[last_index].pago = true;
  //     ajaxCadastro.updateCadastro(cadastro, function () {
  //       listaCadastros();
  //     });
  //     //} else {
  //     //  $scope.modals.open_cant_calculate_dialog();
  //     // }
  // 
  //   };

  $scope.finalizaBrincadeira = function (cadastro) {
    var last_index = cadastro.historico.length - 1;
    if (cadastro.historico[last_index].pago == true) {
      cadastro.brincando = false;   
      
      //salvar nova receita
      var nova_receita = {
        valor: cadastro.historico[last_index].valor_final,
        forma_pagamento: cadastro.historico[last_index].forma_pagamento,
        data: cadastro.historico[last_index].data
      };

      $scope.add_receita(nova_receita);

      ajaxCadastro.updateCadastro(cadastro, function () {
        listaCadastros();
      });
    }
  };

  $scope.goHome = function (cadastro) {
    cadastro.standing_by = false;
    ajaxCadastro.updateCadastro(cadastro, function () {
      listaCadastros();
    });
  };

  $scope.excluiCadastro = function (id) {
    ajaxCadastro.deleteCadastro(id, function () {
      listaCadastros();
    });
  };


  function listaCadastros() {
    //passar função callback para o ajax service
    ajaxCadastro.readCadastro(function (data) {
      $scope.model.cadastros = data;
      $scope.model.players.length = 0;
      $scope.model.cadastros.forEach(function (cadastro) {
        if (cadastro.brincando == true || cadastro.standing_by == true) {
          $scope.model.players.push(cadastro);
        }
      });
    });
  };
  
  //despesas
  // $scope.filtroDespesas = {
  //   inicio: new Date,
  //   fim: new Date,
  // };
  
  //despesa
  // $scope.despesa = {
  //   valor: 0,
  //   descricao: '',
  //   data: new Date()
  // };

  function listaDespesas() {
    //passar função callback para o ajax service
    ajaxDespesas.readDespesa(function (data) {
      $scope.model.despesas.length = 0;
      $scope.model.despesas = data;
    });
  };

  $scope.add_despesa = function () {
    var nova_despesa = {
      valor: angular.copy($scope.despesa.valor),
      descricao: angular.copy($scope.despesa.descricao),
      data: get_data_selecionada()
    }
    ajaxDespesas.createDespesa(nova_despesa, function () {
      delete $scope.despesa;
      delete $scope.model.calendario;
      listaDespesas();
    });
  };

  $scope.atualiza_despesa = function (despesa) {
    ajaxDespesas.updateDespesa(despesa, function () {
      listaDespesas();
    });
  };

  $scope.excluiDespesa = function (id) {
    ajaxDespesas.deleteDespesa(id, function () {
      listaDespesas();
    });
  };
  
  //receita
  function listaReceita() {
    //passar função callback para o ajax service
    ajaxReceita.readReceita(function (data) {
      $scope.model.receitas.length = 0;
      $scope.model.receitas = data;
    });
  };

  $scope.add_receita = function (nova_receita) {
    ajaxReceita.createReceita(nova_receita, function () {
      listaReceita();
    });
  };

  $scope.atualiza_receita = function (receita) {
    ajaxReceita.updateReceita(receita, function () {
      listaReceita();
    });
  };

  $scope.excluiReceita = function (id) {
    ajaxReceita.deleteReceita(id, function () {
      listaReceita();
    });
  };  
  
  //Configuração
  function getConfiguracao() {
    //passar função callback para o ajax service
    ajaxPrecos.readConfig(function (config_data) {
      //$scope.model.config = angular.fromJson(config_data);
      $scope.model.config = config_data;
    });
  };

  $scope.configura = function (nova_config) {
    ajaxPrecos.createConfig(nova_config, function (config_data) {
      $scope.model.config = config_data;
    });
  };

  $scope.atualiza_config = function () {
    var config_update = angular.copy($scope.model.config[0]);
    ajaxPrecos.updateConfig(config_update, function (config_data) {
      $scope.model.config.length = 0;
      $scope.model.config = angular.fromJson(config_data);
      $location.path('/');
    });
  };
});