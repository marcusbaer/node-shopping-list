define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var ModelAbstract = Backbone.Model.extend({});
    var CollectionAbstract = Backbone.Collection.extend({});

    var Models = {};

    var Label = Models.Label = ModelAbstract.extend({
		type: 'label',
        defaults: {
            id: null,
            name: null
        }
    });

    var Labels = Models.Labels = CollectionAbstract.extend({
        type: 'labels',
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
		urlRoot: '/service/trader',
        defaults: {
            uid: null,
            name: null,
            labels: new Labels()
        }
    });

    var Traders = Models.Traders = CollectionAbstract.extend({
        type: 'traders',
        model: Trader,
        url: 'service/traders'
    });

    var Product = Models.Product = ModelAbstract.extend({
        type: 'product',
		urlRoot: '/service/product',
        defaults: {
            uid: null,
            name: null,
            labels: new Labels(),
            traders: new Traders()
        }
    });

    var Products = Models.Products = CollectionAbstract.extend({
        type: 'products',
        model: Product,
        url: 'service/products'
    });

    var Store = Models.Store = ModelAbstract.extend({
        type: 'store',
		urlRoot: '/service/store',
        defaults: {
            uid: null,
            name: null,
            labels: new Labels(),
            address: null,  // to display in OSM
            info: '',       // information about opening hours etc.
            trader: null    // model Trader
        }
    });

    var Stores = Models.Stores = CollectionAbstract.extend({
        type: 'stores',
        model: Store,
        url: 'service/stores'
    });

    return Models;

});