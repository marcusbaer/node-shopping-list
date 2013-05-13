define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var ModelAbstract = Backbone.Model.extend({});
    var CollectionAbstract = Backbone.Collection.extend({});

    var Models = {};

    var Label = Models.Label = ModelAbstract.extend({
        defaults: {
            id: null,
            name: null
        },
        type: function () {
            return 'label';
        }
    });

    var Labels = Models.Labels = CollectionAbstract.extend({
        model: Label,
        getList: function (id) {
            return this.toJSON();
        },
        addLabel: function (attrs) {
            this.push(new Label(attrs));
        }
    });

    var Trader = Models.Trader = ModelAbstract.extend({
        defaults: {
            id: null,
            name: null,
            labels: new Labels()
        },
        type: function () {
            return 'trader';
        }
    });

    var Traders = Models.Traders = CollectionAbstract.extend({
        model: Trader,
        url: 'service/traders'
    });

    var Product = Models.Product = ModelAbstract.extend({
        defaults: {
            id: null,
            name: null,
            labels: new Labels(),
            traders: new Traders()
        },
        type: function () {
            return 'product';
        }
    });

    var Products = Models.Products = CollectionAbstract.extend({
        model: Product,
        url: 'service/products'
    });

    var Store = Models.Store = ModelAbstract.extend({
        defaults: {
            id: null,
            name: null,
            labels: new Labels(),
            address: null,  // to display in OSM
            info: '',       // information about opening hours etc.
            trader: null    // model Trader
        },
        type: function () {
            return 'store';
        }
    });

    var Stores = Models.Stores = CollectionAbstract.extend({
        model: Store,
        url: 'service/stores'
    });

    return Models;

});