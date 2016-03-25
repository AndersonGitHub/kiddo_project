var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express(),
validator = require('validator');

//controllers
var cadastroController = require('./controllers/cadastro_ctrl.js');
var configController = require('./controllers/config_ctrl.js');
var historicoController = require('./controllers/historico_ctrl.js');
var despesaController = require('./controllers/despesa_ctrl.js');
var receitaController = require('./controllers/receita_ctrl.js'); 

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static(path.join(__dirname, '../')));

app.use(bodyParser.urlencoded({
  extended: true
  }));
  
app.use(bodyParser.json());

var port = 5000;
app.listen(port, function () {  
  console.log("Application listening on port " + port);
});

//mongoose
var mongoose = require('mongoose');
var db_string = 'mongodb://127.0.0.1/test';
mongoose.connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error.'));
var HistoricoModel = undefined;
var CadastroModel = undefined;
var DespesaModel = undefined;
var ReceitaModel = undefined;
var PrecosModel = undefined;

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
  
  exports.HistoricoModel = mongoose.model('HistoricoModel', historicoSchema);
  exports.CadastroModel = mongoose.model('CadastroModel', cadastroSchema);
  exports.DespesaModel = mongoose.model('DespesaModel', despesaSchema);
  exports.ReceitaModel = mongoose.model('ReceitaModel', receitaSchema);
  exports.PrecosModel = mongoose.model('PrecosModel', precosSchema);    
 });
 
 
 
 //Despesa==================================================================
app.get('/despesa/', function (req, res) {  
  despesaController.list(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/despesa/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  despesaController.get(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/despesa/', function (req, res) {
  var despesaParameters = {    
    valor : validator.trim(validator.escape(req.body.valor)),
    descricao : validator.trim(validator.escape(req.body.descricao)),
    data : validator.trim(validator.escape(req.body.data))    
  };
  despesaController.save(despesaParameters, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/despesa/', function(req, res) {
  var despesaUpdate = {    
    valor : validator.trim(validator.escape(req.body.valor)),
    descricao : validator.trim(validator.escape(req.body.descricao)),
    data : validator.trim(validator.escape(req.body.data))    
  }
	  
	despesaController.update(despesaUpdate, function(resp) {
		res.json(resp);
	});
});

app.delete('/despesa/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  despesaController.delete(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});  

//Receita================================================
app.get('/receita/', function (req, res) {  
  receitaController.list(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/receita/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  receitaController.get(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/receita/', function (req, res) {
  var receitaParameters = {    
    valor : validator.trim(validator.escape(req.body.valor)),
    forma_pagamento : validator.trim(validator.escape(req.body.forma_pagamento)),
    data : validator.trim(validator.escape(req.body.data))    
  };
  receitaController.save(receitaParameters, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/receita/', function(req, res) {
  var receitaUpdate = {    
    valor : validator.trim(validator.escape(req.body.valor)),
    forma_pagamento : validator.trim(validator.escape(req.body.forma_pagamento)),
    data : validator.trim(validator.escape(req.body.data))    
  }
	  
	receitaController.update(receitaUpdate, function(resp) {
		res.json(resp);
	});
});

app.delete('/receita/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  receitaController.delete(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});  
    
//Cadastro================================================
app.get('/cadastro/', function (req, res) {  
  cadastroController.listCadastro(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/cadastro/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.body._id));
  cadastroController.get(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/cadastro/', function (req, res) {
  var mainFormParameters = {
    dn_crianca: validator.trim(validator.escape(req.body.dn_crianca)),    
    nome_responsavel: validator.trim(validator.escape(req.body.nome_responsavel)),    
    nome_crianca: validator.trim(validator.escape(req.body.nome_crianca)),
    email: validator.trim(validator.escape(req.body.email)),
    telefone: validator.trim(validator.escape(req.body.telefone)),
    tel_operadora: validator.trim(validator.escape(req.body.tel_operadora)),
    observacoes: validator.trim(validator.escape(req.body.observacoes)),
    brincando: req.body.brincando,    
    standing_by : req.body.standing_by,    
    historico: req.body.historico        
  };
  cadastroController.saveCadastro(mainFormParameters, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/cadastro/', function(req, res) {  
  var mainFormParameters = {
    id : validator.trim(validator.escape(req.body._id)),
    nome_crianca: validator.trim(validator.escape(req.body.nome_crianca)),
    dn_crianca: validator.trim(validator.escape(req.body.dn_crianca)),    
    nome_responsavel: validator.trim(validator.escape(req.body.nome_responsavel)),    
    email: validator.trim(validator.escape(req.body.email)),
    telefone: validator.trim(validator.escape(req.body.telefone)),
    tel_operadora: validator.trim(validator.escape(req.body.tel_operadora)),
    observacoes: validator.trim(validator.escape(req.body.observacoes)),    
    brincando: validator.trim(validator.escape(req.body.brincando)),
    standing_by : validator.trim(validator.escape(req.body.standing_by)),
    historico: req.body.historico    
  };  
	
	cadastroController.updateCadastro(mainFormParameters, function(resp) {
		res.json(resp);
	});
});

app.delete('/cadastro/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.params.id));
  cadastroController.deleteCadastro(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});  

//Configurações==================================================================
app.get('/config/', function (req, res) {  
  configController.list(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/config/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  configController.get(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/config/', function (req, res) {
  var configParameters = {
    valor_hora : validator.trim(validator.escape(req.body.valor_hora)),
    valor_par_meias: validator.trim(validator.escape(req.body.valor_par_meias))    
  };
  configController.save(configParameters, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/config/', function(req, res) {
  var config_update = {
    _id : validator.trim(validator.escape(req.body._id)),
    valor_hora : validator.trim(validator.escape(req.body.valor_hora)),
    valor_par_meias : validator.trim(validator.escape(req.body.valor_par_meias))    
  }
	  
	configController.update(config_update, function(resp) {
		res.json(resp);
	});
});

app.delete('/config/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  configController.delete(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});


//Histórico==================================================================
app.get('/history/', function (req, res) {  
  historicoController.list(
    function(resp) {      
      res.json(resp);
      }
  );  
});

app.get('/history/:id', function (req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  historicoController.get(id, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);
    });
});

app.post('/history/', function (req, res) {
  var histParameters = {    
    data: validator.trim(validator.escape(req.body.data)),
    inicio: validator.trim(validator.escape(req.body.inicio)),    
    fim: validator.trim(validator.escape(req.body.fim)),    
    valor_total: validator.trim(validator.escape(req.body.valor_total)),    
    desconto: validator.trim(validator.escape(req.body.desconto)),
    valor_pago: validator.trim(validator.escape(req.body.valor_pago)),  
    finalizado : validator.trim(validator.escape(req.body.finalizado)),
    calculado : validator.trim(validator.escape(req.body.calculado))
  };
  historicoController.save(histParameters, function(err, resp) {
    if(err) res.send(err);
    res.json(resp);}
    );
    });
    
app.put('/history/', function(req, res) {
  var id = validator.trim(validator.escape(req.param('id')));
  var data = validator.trim(validator.escape(req.param('data')));
  var inicio = validator.trim(validator.escape(req.param('inicio')));
  var fim = validator.trim(validator.escape(req.param('fim')));
  var valor_total = validator.trim(validator.escape(req.param('valor_total')));  
  var desconto = validator.trim(validator.escape(req.param('desconto')));
  var valor_pago = validator.trim(validator.escape(req.param('valor_pago')));
  var finalizado = validator.trim(validator.escape(req.param('finalizado')));
  var calculado = validator.trim(validator.escape(req.param('calculado')));  
  
  historicoController.update(id, data, inicio, fim, valor_total, desconto, valor_pago, finalizado, calculado, function(resp) {
		res.json(resp);
	});
});

app.delete('/history/:id', function (req, res) {  
  var id = validator.trim(validator.escape(req.param('id')));
  historicoController.delete(id, function(err, resp) {
    if(err) res.send(err);
		res.json(resp);
    });
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
// function list_documents(callback) {
//   DocumentModel.find({}, function (error, docs) {
//     if (error) {
//       callback({ error: 'error...' });
//     } else {
//       callback(docs);
//     }
//   });
// };
// 
// function get_one_dodument(id, callback) {
//   DocumentModel.findById(id, function (error, doc) {
//     if (error) {
//       callback({ error: 'error...' });
//     } else {
//       callback(doc);
//     }
//   });
// };
// 
// function save_document(new_doc, callback) {
//   new DocumentModel({    
//     //attribute_1: new_doc.attribute_1,
//     attribute_2: new_doc.attribute_2,
//     attribute_3: new_doc.attribute_3    
//   }).save(function (error, doc) {
//     if (error) {
//       callback({ error: 'error...' });
//     } else {
//       callback(doc);
//     }
//   });
// };
// 
// function update_document(doc_update, callback) {  
//   DocumentModel.findById(doc_update._id, function (err, doc) {    
//     if (Boolean(doc_update.attribute_1)) {doc.attribute_1 = doc_update.attribute_1;}
//     if (Boolean(doc_update.attribute_2)) {doc.attribute_2 = doc_update.attribute_2;}
//     if (Boolean(doc_update.attribute_3)) {doc.attribute_3 = doc_update.attribute_3;}    
//     doc.save(function (error, doc) {
//       if (error) {
//         callback({ error: 'error...' });
//       } else {
//         callback(doc);
//       }
//     });
// 
//   });
// };
// 
// function delete_document(id, callback) {
//   DocumentModel.findById(id, function (error, doc) {
//     if (error) {
//       callback({ error: 'error...' });
//     } else {
//       doc.remove(function (error) {
//         if (!error) {
//           callback({ response: 'success on remove' });
//         }
//       });
//     }
//   });
// };
//  
//  
// //REST API 
// app.get('/doc/', function (req, res) {  
//   list_documents(
//     function(resp) {      
//       res.json(resp);
//       }
//   );  
// });
// 
// app.get('/doc/:id', function (req, res) {
//   var id = validator.trim(validator.escape(req.param('id')));
//   get_one_dodument(id, function(err, resp) {
//     if(err) res.send(err);
//     res.json(resp);
//     });
// });
// 
// app.post('/doc/', function (req, res) {
//   var new_doc = {    
//     attribute_1 : validator.trim(validator.escape(req.body.attribute_1)),
//     attribute_2 : validator.trim(validator.escape(req.body.attribute_2)),
//     attribute_3 : validator.trim(validator.escape(req.body.attribute_3))        
//   };
//   save_document(new_doc, function(err, resp) {
//     if(err) res.send(err);
//     res.json(resp);}
//     );
//     });
//     
// app.put('/doc/', function(req, res) {
//   var doc_update = {
//     _id : validator.trim(validator.escape(req.body._id)),
//     attribute_1 : validator.trim(validator.escape(req.body.attribute_1)),
//     attribute_2 : validator.trim(validator.escape(req.body.attribute_2)),
//     attribute_3 : validator.trim(validator.escape(req.body.attribute_3))    
//   };  	  
// 	update_document(doc_update, function(resp) {
// 	 	res.json(resp);
// 	 });
// });
// 
// app.delete('/doc/:id', function (req, res) {  
//   var id = validator.trim(validator.escape(req.param('id')));
//   delete_document(id, function(err, resp) {
//     if(err) res.send(err);
// 		res.json(resp);
//     });
// });