var db = require('../node_app.js');

exports.list = function (callback) {
  db.DespesaModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar as despesas.' });
    } else {
      callback(docs);
    }
  });
};

exports.get = function (id, callback) {
  db.DespesaModel.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar a despesa' });
    } else {
      callback(despesa);
    }
  });
};

exports.save = function (formParameters, callback) {
  new db.DespesaModel({    
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

exports.update = function (despesa_update, callback) {
  db.DespesaModel.findById(despesa_update.id, function (err, despesa) {    
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

exports.delete = function (id, callback) {
  db.DespesaModel.findById(id, function (error, despesa) {
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