var models = require('../mongoose_models.js');

module.exports.list = function (callback) {
  models.DespesaModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar as despesas.' });
    } else {
      callback(docs);
    }
  });
};

module.exports.get = function (id, callback) {
  models.DespesaModel.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar a despesa' });
    } else {
      callback(despesa);
    }
  });
};

module.exports.save = function (formParameters, callback) {
  new models.DespesaModel({    
    valor: formParameters.valor,
    descricao: formParameters.descricao,    
    data : formParameters.data
  }).save(function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar a despesa' });
    } else {
      callback(despesa);
    }
  });
};

module.exports.update = function (despesa_update, callback) {
  models.DespesaModel.findById(despesa_update.id, function (err, despesa) {    
    if (Boolean(despesa_update.descricao)) {despesa.descricao = despesa_update.descricao;}
    if (Boolean(despesa_update.data)) {despesa.data = despesa_update.data;}       
    
    despesa.save(function (error, despesa) {
      if (error) {
        callback({ error: 'Nao foi possivel atualizar a despesa.' });
      } else {
        callback(despesa);
      }
    });

  });
};

module.exports.delete = function (id, callback) {
  models.DespesaModel.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel remover a despesa' });
    } else {
      despesa.remove(function (error) {
        if (!error) {
          callback({ response: 'Despesa excluída com sucesso' });
        }
      });
    }
  });
};