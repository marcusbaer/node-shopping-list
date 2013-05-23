var argv = require('optimist').argv,
	sys = require('util'),
	Backbone = require('backbone');

var ModelAbstract = Backbone.Model.extend({
    toggle: function (attribute) {
        attribute = attribute || 'flag';
        this.set( attribute, !this.get(attribute) );
    }
});
var CollectionAbstract = Backbone.Collection.extend({});

var Models = {};

var Label = Models.Label = ModelAbstract.extend({
    type: 'label',
    defaults: {
        uid: null,
        flag: false,
        name: null
    }
});

var Labels = Models.Labels = CollectionAbstract.extend({
    model: Label,
    getList: function (uid) {
        return this.toJSON();
    },
    addLabel: function (attrs) {
        this.push(new Label(attrs));
    }
});

var Trader = Models.Trader = ModelAbstract.extend({
    type: 'trader',
//    urlRoot: '/service/trader',
    defaults: {
        uid: null,
        flag: false,
        name: null,
        labels: new Labels()
    }
});

var Traders = Models.Traders = CollectionAbstract.extend({
    model: Trader
//    url: 'service/traders'
});

var Product = Models.Product = ModelAbstract.extend({
    type: 'product',
//    urlRoot: '/service/product',
    defaults: {
        uid: null,
        flag: false,
        name: null,
        labels: new Labels(),
        traders: new Traders()
    }
});

var Products = Models.Products = CollectionAbstract.extend({
    model: Product
//    url: 'service/products'
});

var Store = Models.Store = ModelAbstract.extend({
    type: 'store',
//    urlRoot: '/service/store',
    defaults: {
        uid: null,
        flag: false,
        name: null,
        labels: new Labels(),
        address: null,  // to display in OSM
        info: '',       // information about opening hours etc.
        trader: null    // model Trader
    }
});

var Stores = Models.Stores = CollectionAbstract.extend({
    model: Store
//    url: 'service/stores'
});

module.exports = Models;
