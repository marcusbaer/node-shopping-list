(function() {
    require.config({
        'i18n': {
            locale: 'en-EN'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        },
        paths: {
            'requireLib': 'libs/require/require',
            'text': 'libs/require/text',
            'i18n': 'libs/require/i18n',
            'socketio': 'libs/socketio/socket.io',
            'underscore': 'libs/underscore/underscore',
            'backbone': 'libs/backbone/backbone',
            'jquery': 'libs/jquery/jquery'
        }
    });

    define([
        'underscore',
        'backbone',
        'jquery',
        'shopping/models',
        'shopping/views',
        'socketio'
    ], function(
        _,
        Backbone,
        $,
        Models,
        Views
        ) {
        var Shopping, messages;
        return Shopping = (function() {

            function Shopping() {}
            var AppRouter = Backbone.Router.extend({

                routes: {
                    "":                         "start",
                    "*actions":                 "start"
                },

                initialize: function() {

                    window.app = app = {};

                    var socket = app.socket = io.connect( document.location.origin );
                    socket.on('connect', function () {
                        socket.emit('hello', {id: '123'});
                        socket.on('hello', function (data) {
                            console.log("response from hello socket:");
                            console.log(data);
                        });
                    });

                },

                start: function() {
					// more code here in our starting route ...

					$(document).ready(function() {

                        var products = new Models.Products();
						var productsView = new Views.MiddleCollection({
							collection: products
						});
                        $('#app').append(productsView.render().el);

                        var menuitems = new Models.Menuitems([{
                            uid: 1,
                            name: 'add product',
                            icon: ''
                        }, {
                            uid: 2,
                            name: 'add store',
                            icon: ''
                        }]);
                        var menuView = new Views.SmallCollection({
                            collection: menuitems
                        });
                        $('#app').append($('<div id="menu"></div>'));
                        $('#menu').append(menuView.render().el);

                        products.fetch();

					});
                }

            });

            var app_router = new AppRouter;
            Backbone.history.start();

            Shopping.prototype.say = function() {
                return console.log("say");
            };

            return Shopping;

        })();
    });

}).call(this);
