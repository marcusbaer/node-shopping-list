var argv = require('optimist').argv,
	sys = require('util'),
	Backbone = require('backbone'),
	Models = require('./models');

/*
var Products = require('../../simple-collection');
var Product = require('../../simple-collection').SimpleModel;
var Stores = require('../../simple-collection');
var Store = require('../../simple-collection').SimpleModel;

var fetchAllCallback = function (data) {
//	console.log(Products);
}

Products.addDatasource('data/shopping.db', 'products');
Products.fetchAll(fetchAllCallback);

Stores.addDatasource('data/shopping.db', 'stores');
Stores.fetchAll();

Products.add(new Product({
	name: 'ABC',
	labels: ['ab', 'bc']
}));
*/

var Service = {
/*
	returns playlist with add timestamps
*/	
	playlist: function (method, id, params) {
		var d = new Date();
		if (method === 'put') {
			// add file with that id to playlist
			return [{uid: id, added: d.getTime()}];
		} else {
			// just return playlist
			return [{uid: id, added: d.getTime()}];
		}
	},

    set: function () {
    }

};

module.exports = Service;
