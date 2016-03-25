angular.module('angularApp').factory('progressBarService', function ($timeout, $http) {
    
    return {
      start: start
    };
    
    function updateProgressBar(playersArray) {
      playersArray.forEach(function (player) {
        if (player.brincando) {
          if (player.historico[player.historico.length - 1].progresso < 100) {
            player.historico[player.historico.length - 1].progresso += 5;
            //ajax_cadastro_service.updateCadastro(player, function () { });            
          }
        }
      });
      $timeout(updateProgressBar, 5000);
    }

    function start(array) {
      $timeout(updateProgressBar(array), 0);
    }

  });