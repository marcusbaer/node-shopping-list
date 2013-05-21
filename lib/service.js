var argv = require('optimist').argv,
	sys = require('util'),
	Backbone = require('backbone'),
	Models = require('./models');

var Products = new Models.Products();
var Stores = new Models.Stores();

/*
var Products = require('../../simple-collection');
var Product = require('../../simple-collection').SimpleModel;
var Stores = require('../../simple-collection');
var Store = require('../../simple-collection').SimpleModel;
*/

var fetchAllCallback = function (data) {
//	console.log(Products);
}

//Products.addDatasource('data/shopping.db', 'products');
//Products.fetchAll(fetchAllCallback);
//
//Stores.addDatasource('data/shopping.db', 'stores');
//Stores.fetchAll();

Products.add(new Models.Product({
	name: 'ABC',
	labels: ['ab', 'bc']
}));

var Service = {

	products: function (method, id, params) {
		return Products.toJSON();
	},

    set: function () {
    }

};

module.exports = Service;
