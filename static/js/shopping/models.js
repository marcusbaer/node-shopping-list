define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var ModelAbstract = Backbone.Model.extend({
        toggle: function () {
            var self = this;
            $.ajax({
                type: "POST",
                url: '/service/' + this.type + '/' + this.get('uid'),
                data: {toggle: "flag"}
            }).done(function successfulToggled (response) {
//                self.attributes = response;
                  self.set('flag', response.flag);
            });
        },
        post: function (attribute, value) {
            var self = this;
            $.ajax({
                type: "POST",
                url: '/service/' + this.type + '/' + this.get('uid'),
                data: {attribute: attribute, value: value}
            }).done(function successfulToggled (response) {
//                self.attributes = response;
                    self.set(attribute, response[attribute]);
                });
        }
    });
    var CollectionAbstract = Backbone.Collection.extend({
        initialize: function (options) {
            if (options) {
                this.options = options;
            }
        },
        getName: function () {
            return (this.options && this.options.name) ? this.options.name : '';
        }
    });

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
            flag: false,
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
            flag: false,
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
            flag: false,
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

    var Menuitem = Models.Menuitem = ModelAbstract.extend({
        type: 'menuitem',
        defaults: {
            uid: null,
            flag: false,
            name: null,
            icon: null
        }
    });

    var Menuitems = Models.Menuitems = CollectionAbstract.extend({
        type: 'menuitems',
        model: Menuitem,
        getList: function (uid) {
            return this.toJSON();
        }
    });

    return Models;

});