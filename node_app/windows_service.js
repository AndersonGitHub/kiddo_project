var Service = require('node-windows').Service;

var svc = new Service({
  name:'Kiddo Project',
  description: 'Módulo para execução de servidor NodeJS como serviço do Windows.',
  script: 'C:\\path\\to\\kiddo-project.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

//https://www.npmjs.com/package/node-windows

// Installation

// The recommended way to install node-windows is with npm, using the global flag:
// 
// npm install -g node-windows
// 
// Then, in your project root, run:
// 
// npm link node-windows
// 
// However; it is possible to use node-windows without the global flag (i.e. install directly into the project root). 
// More details regarding why this is not the recommended approach are available throughout this Readme.

