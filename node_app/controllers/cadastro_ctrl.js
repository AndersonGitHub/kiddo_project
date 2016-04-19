var models = require('../mongoose_models.js');

module.exports.listCadastro = function (callback) {
  models.CadastroModel.find({}, function (error, docs) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar os cadastros.' });
    } else {
      callback(docs);
    }
  });
};

module.exports.getCadastro = function (id, callback) {
  models.CadastroModel.findById(id, function (error, cadastro) {
    if (error) {
      callback({ error: 'Nao foi possivel retornar o cadastro' });
    } else {
      callback(cadastro);
    }
  });
};

module.exports.saveCadastro = function (formParameters, callback) {
  new models.CadastroModel({
    nome_crianca: formParameters.nome_crianca,
    dn_crianca: formParameters.dn_crianca,
    nome_responsavel: formParameters.nome_responsavel,
    email: formParameters.email,
    telefone: formParameters.telefone,
    tel_operadora: formParameters.tel_operadora,
    observacoes: formParameters.observacoes,
    brincando: formParameters.brincando,
    standing_by: formParameters.standing_by,
    historico: formParameters.historico//ARRAY      
  }).save(function (error, cadastro) {
    if (error) {
      callback({ error: 'Nao foi possivel salvar o cadastro' });
    } else {
      callback(cadastro);
    }
  });
};

module.exports.updateCadastro = function (cadastro_update, callback) {
  models.CadastroModel.findById(cadastro_update.id, function (err, cadastro) {
    if (Boolean(cadastro_update.nome_crianca)) { cadastro.nome_crianca = cadastro_update.nome_crianca; }
    if (Boolean(cadastro_update.dn_crianca)) { cadastro.dn_crianca = cadastro_update.dn_crianca; }
    if (Boolean(cadastro_update.nome_responsavel)) { cadastro.nome_responsavel = cadastro_update.nome_responsavel; }
    if (Boolean(cadastro_update.email)) { cadastro.email = cadastro_update.email; }
    if (Boolean(cadastro_update.telefone)) { cadastro.telefone = cadastro_update.telefone; }
    if (Boolean(cadastro_update.tel_operadora)) { cadastro.tel_operadora = cadastro_update.tel_operadora; }
    if (Boolean(cadastro_update.observacoes)) { cadastro.observacoes = cadastro_update.observacoes; }
    cadastro.brincando = cadastro_update.brincando; 
    cadastro.standing_by = cadastro_update.standing_by;
    if (Boolean(cadastro_update.historico)) { cadastro.historico = cadastro_update.historico; }

    cadastro.save(function (error, cadastro) {
      if (error) {
        callback({ error: 'Nao foi possivel atualizar cadastro.' });
      } else {
        callback(cadastro);
      }
    });

  });
};

module.exports.deleteCadastro = function (id, callback) {
  models.CadastroModel.findById(id, function (error, cadastro) {
    if (error) {
      callback({ error: 'Nao foi possivel remover o cadastro' });
    } else {
      cadastro.remove(function (error) {
        if (!error) {
          callback({ response: 'Cadastro excluido com sucesso' });
        }
      });
    }
  });
};