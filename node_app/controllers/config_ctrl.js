var db = require('../node_app.js');

exports.list = function (callback) {
  db.PrecosModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar os cadastros.' });
    } else {
      callback(docs);
    }
  });
};

exports.get = function (id, callback) {
  db.PrecosModel.findById(id, function (error, config) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar a configuração.' });
    } else {
      callback(config);
    }
  });
};

exports.save = function (configParameters, callback) {
  new db.PrecosModel({
    valor_hora: configParameters.valor_hora,
    valor_par_meias: configParameters.valor_par_meias
  }).save(function (error, config) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar a configuração.' });
    } else {
      callback(config);
    }
  });
};

exports.update = function (configParameters, callback) {  
  db.PrecosModel.findById(configParameters._id, function (err, config) {
    if (configParameters.valor_hora) {      
      config.valor_hora = configParameters.valor_hora;
    }
    if (configParameters.valor_par_meias) {
      config.valor_par_meias = configParameters.valor_par_meias;
    }

    config.save(function (erro, config) {
      if (erro) {
        callback({ erro: 'Nao foi possivel atualizar a configuração.' });
      } else {
        callback({ sucesso: 'Configuração atualizada com sucesso.' });
      }
    });
  });
};

exports.delete = function (id, callback) {
  db.PrecosModel.findById(id, function (error, config) {
    if (error) {
      callback({ error: 'Nao foi possivel remover a configuração.' });
    } else {
      config.remove(function (error) {
        if (!error) {
          callback({ response: 'Configuração excluida com sucesso' });
        }
      });
    }
  });
};