var argv = require('optimist').argv,
	_ = require('underscore'),
    sys = require('util'),
	app = require('../doxybox/lib/doxybox'),
	config = require('./conf/config'),
    service = require('./lib/service');

// overwrite config from file by command line arguments	
config = _.extend(config, argv);

var shoppingService = new(service.Service);

// setup application
app.config(config);
app.service(shoppingService);
app.static('static');
app.jade('jade');

// run application
app.start();
