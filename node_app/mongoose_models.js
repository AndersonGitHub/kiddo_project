var mongoose = require('mongoose');
var db_string = 'mongodb://127.0.0.1/test';
mongoose.connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error.'));
// var HistoricoModel = undefined;
// var CadastroModel = undefined;
// var DespesaModel = undefined;
// var ReceitaModel = undefined;
// var PrecosModel = undefined;

db.once('open', function () {  
  var historicoSchema = mongoose.Schema({
    data: Date,
    inicio: Date,
    fim: Date,
    tempo_restante : Date,
    valor_total: Number,
    valor_final: Number,
    desconto: Number,
    valor_pago: Number,
    troco: Number,
    com_meia: Boolean,
    adicional: Number,
    forma_pagamento: String,
    pago: Boolean,
    progresso: Number
  });
  
  var cadastroSchema = mongoose.Schema({
    nome_crianca: String,
    dn_crianca: Date,
    nome_responsavel: String,
    email: String,
    telefone: String,
    tel_operadora: String,
    observacoes: String,
    brincando: Boolean,
    standing_by: Boolean,
    historico: [historicoSchema]
  }); 

  var despesaSchema = mongoose.Schema({    
    valor: Number,
    descricao: String,
    data: Date
  });
  
  var receitaSchema = mongoose.Schema({    
    valor: Number,
    forma_pagamento: String,
    data: Date   
  });
  
  var precosSchema = mongoose.Schema({
    valor_hora: Number,
    valor_par_meias: Number
  });
  
  module.exports.HistoricoModel = mongoose.model('HistoricoModel', historicoSchema);
  module.exports.CadastroModel = mongoose.model('CadastroModel', cadastroSchema);
  module.exports.DespesaModel = mongoose.model('DespesaModel', despesaSchema);
  module.exports.ReceitaModel = mongoose.model('ReceitaModel', receitaSchema);
  module.exports.PrecosModel = mongoose.model('PrecosModel', precosSchema);    
 });