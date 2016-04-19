angular.module('angularApp').factory('modelService', function () {
  function cria_numeros(n_ini, n_max, n_step) {
    var nums = [];
    for (var numero = n_ini; numero < (n_max + 1); numero += n_step) {
      nums.push(numero);
    }
    return nums;
  };
  function get_data_atual() {
    var data = new Date();
    return {
      dia: data.getDate(),
      mes: (data.getMonth() + 1),
      ano: data.getFullYear(),
      hora: data.getUTCHours(),
      minuto: data.getUTCMinutes()
    };
  };
  //objeto representando o modelo. O atributo 'players' será atualizado via AJAX
  return {
    app_name: 'Diversão MaisKidMais',
    alert : 'Dicas e alertas aqui!',
    tempo_em_horas: 0,
    tempo_em_minutos: 0,
    inicio: {
      hora: 10,
      minuto: 45
    },
    fim: {
      hora: 11,
      minuto: 45
    },
    desconto: 0,
    valor_pago: 0,
    com_meia: false,
    config: [],
    players: [],
    cadastros: [],
    despesas : [],
    receitas : [],
    f_despesas : [],
    f_receitas : [],
    filtro: '',
    filtro_despesa : '',
    filtro_receita : '',
    total_receita : 0,
    total_despesa : 0,    
    ordem: '',
    resposta: '',
    checked: -1,
    tab: 0,
    dias: cria_numeros(1, 31, 1),
    meses: cria_numeros(1, 12, 1),
    anos: cria_numeros(2010, 2016, 1),
    horas: cria_numeros(0, 23, 1),
    minutos: cria_numeros(0, 59, 5),
    operadoras: ['CLARO', 'VIVO', 'NEXTEL', 'OI', 'TIM', 'NET', 'OUTRA'],
    forma_pagamento: ['DEBITO', 'CREDITO', 'DINHEIRO'],
    calendario: {
      dia: get_data_atual().dia,
      mes: get_data_atual().mes,
      ano: get_data_atual().ano
    },
    data_atual: (function () {
      var data = new Date();
      return {
        dia: data.getDate(),
        mes: (data.getMonth() + 1),
        ano: data.getFullYear(),
        hora: data.getUTCHours(),
        minuto: data.getUTCMinutes()
      };
    })(),
    //funções   
    configurado: function () {
      return this.config.length > 0;
    },
    ordena: function (criterio) {
      this.ordem = criterio;
    },
    change: function (index) {
      if (this.checked == index) {
        this.checked = -1;
      } else {
        this.checked = index;
      }
    },
    isSelected: function (n) {
      return this.tab == n;
    },
    selectTab: function (n) {
      this.tab = n;
    },
    setDia: function (index, dia) {
      var dn_crianca = new Date(angular.copy(this.players[index].dn_crianca));
      dn_crianca.setDate(dia);
      this.players[index].dn_crianca = dn_crianca;
    },
    setMes: function (index, mes) {
      var dn_crianca = new Date(angular.copy(this.players[index].dn_crianca));
      dn_crianca.setMonth(mes - 1);//Date.getMonth() retorna 0 a 11. Ao setar com 'setMonth()' diminuir 1    
      this.players[index].dn_crianca = dn_crianca;
    },
    setAno: function (index, ano) {
      var dn_crianca = new Date(angular.copy(this.players[index].dn_crianca));
      dn_crianca.setFullYear(ano);
      this.players[index].dn_crianca = dn_crianca;
    },
    //alterar hora e minuto do histórico atual
    setHoraIni: function (index, hora) {
      if (!(this.players[index].historico[0] == null)) {
        var inicio = new Date(angular.copy(this.players[index].historico[0].inicio));
        inicio.setHours(hora);
        this.players[index].historico[0].inicio = inicio;
      }

    },
    setMinutoIni: function (index, min) {
      if (!(this.players[index].historico[0] == null)) {
        var inicio = new Date(angular.copy(this.players[index].historico[0].inicio));
        inicio.setMinutes(min);
        this.players[index].historico[0].inicio = inicio;
      }
    },
    setHoraFim: function (index, hora) {
      if (!(this.players[index].historico[0] == null)) {
        var fim = new Date(angular.copy(this.players[index].historico[0].fim));
        fim.setHours(hora);
        this.players[index].historico[0].fim = fim;
      }
    },
    setMinutoFim: function (index, min) {
      if (!(this.players[index].historico[0] == null)) {
        var fim = new Date(angular.copy(this.players[index].historico[0].fim));
        fim.setMinutes(min);
        this.players[index].historico[0].fim = fim;
      }
    }
  }
});