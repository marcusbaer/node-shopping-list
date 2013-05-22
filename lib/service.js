var argv = require('optimist').argv,
	sys = require('util'),
	Backbone = require('backbone'),
	Models = require('./models');

var Products = new Models.Products();
var Stores = new Models.Stores();

var Mock = {
    products: {},
    stores: {},
    traders: {}
};

Mock.traders = new Models.Traders([
    {
        uid: 'aldi',
        name: 'Aldi',
        labels: new Models.Labels()
    }, {
        uid: 'lidl',
        name: 'Lidl',
        labels: new Models.Labels()
    }
]);

Mock.products = new Models.Products([
    {
        uid: 1,
        name: 'Milch',
        labels: new Models.Labels(),
        traders: Mock.traders
    }, {
        uid: 2,
        name: 'Wurst',
        labels: new Models.Labels(),
        traders: Mock.traders
    }, {
        uid: 3,
        name: 'Käse',
        labels: new Models.Labels(),
        traders: Mock.traders
    }
]);

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

if (argv.mock || 1==1) {
    Products = Mock.products;
    Traders = Mock.traders;
}

var Service = {

    product: function (method, uid, params) {
        var products = Products.where({uid: uid});
        if (method == 'put') {
//            products[0].set( 'flag', !products[0].get('flag') ); // toggle product model
            products[0].toggle();
        }
        return products[0];
    },

    products: function (method, uid, params) {
		return Products;
	},

    traders: function (method, uid, params) {
        return Traders;
    },

    set: function () {
    }

};

module.exports = Service;
