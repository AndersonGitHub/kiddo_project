var models = require('../mongoose_models.js');

module.exports.list = function (callback) {
  models.ReceitaModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar as receitas.' });
    } else {
      callback(docs);
    }
  });
};

module.exports.get = function (id, callback) {
  models.ReceitaModel.findById(id, function (error, despesa) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar a receita' });
    } else {
      callback(despesa);
    }
  });
};

module.exports.save = function (formParameters, callback) {
  new models.ReceitaModel({    
    valor: formParameters.valor,
    forma_pagamento: formParameters.forma_pagamento,    
    data : formParameters.data
  }).save(function (error, receita) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar a receita' });
    } else {
      callback(receita);
    }
  });
};

module.exports.update = function (receita_update, callback) {
  models.ReceitaModel.findById(receita_update.id, function (err, receita) {    
    if (Boolean(receita_update.valor)) {receita.valor = receita_update.valor;}
    if (Boolean(receita_update.forma_pagamento)) {receita.forma_pagamento = receita_update.forma_pagamento;}    
    if (Boolean(receita_update.data)) {receita.data = receita_update.data;}       
        
    receita.save(function (error, receita) {
      if (error) {
        callback({ error: 'Nao foi possivel atualizar a receita.' });
      } else {
        callback(receita);
      }
    });

  });
};

module.exports.delete = function (id, callback) {
  models.ReceitaModel.findById(id, function (error, receita) {
    if (error) {
      callback({ error: 'Nao foi possivel remover a receita' });
    } else {
      receita.remove(function (error) {
        if (!error) {
          callback({ response: 'Receita excluída com sucesso' });
        }
      });
    }
  });
};