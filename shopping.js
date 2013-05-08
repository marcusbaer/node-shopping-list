var app = require('doxybox'),
    config = require('./conf/config'),
    service = require('./lib/service');

app.config(config);
app.service(service);
app.static('static');
app.jade('jade');

app.start();
