var models = require('../mongoose_models.js');

module.exports.list = function (callback) {
  models.HistoricoModel.find({}, function (error, historico) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar o histórico.' });
    } else {
      callback(historico);
    }
  });
};

module.exports.get = function (id, callback) {
  models.HistoricoModel.findById(id, function (error, historico) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar o histórico.' });
    } else {
      callback(historico);
    }
  });
};

module.exports.save = function (histParameters, callback) {
  new models.HistoricoModel({
    data: histParameters.data,
    inicio: histParameters.inicio,
    fim: histParameters.fim,
    tempo_restante : histParameters.tempo_restante,
    valor_total: histParameters.valor_total,
    desconto: histParameters.desconto,
    valor_pago: histParameters.valor_pago,
    finalizado: histParameters.finalizado,
    calculado: histParameters.calculado
  }).save(function (error, historico) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar o historico.' });
    } else {
      callback(historico);
    }
  });
};


module.exports.update = function (id, data, inicio, fim, valor_total, tempo_total, desconto, valor_pago, finalizado, calculado, callback) {

  models.HistoricoModel.findById(id, function (err, historico) {
    if (data) {
      historico.data = data;
    }
    if (inicio) {
      historico.inicio = inicio;
    }
    if (fim) {
      historico.fim = fim;
    }
    if (valor_total) {
      historico.valor_total = valor_total;
    }
    if (desconto) {
      historico.desconto = desconto;
    }
    if (valor_pago) {
      historico.valor_pago = valor_pago;
    }
    if (finalizado) {
      historico.finalizado = finalizado;
    }
    if (calculado) {
      historico.calculado = calculado;
    }

    historico.save(function (erro, historico) {
      if (erro) {
        callback({ erro: 'Nao foi possivel atualizar historico.' });
      } else {
        callback({ sucesso: 'Histórico atualizada com sucesso.' });
      }
    });
  });
};

module.exports.delete = function (id, callback) {
  models.HistoricoModel.findById(id, function (error, historico) {
    if (error) {
      callback({ error: 'Nao foi possivel remover o histórico.' });
    } else {
      historico.remove(function (error) {
        if (!error) {
          callback({ response: 'Histórico excluido com sucesso.' });
        }
      });
    }
  });
};