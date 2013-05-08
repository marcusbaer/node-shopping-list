define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var Models = {};

    var Label = Models.Label = Backbone.Model.extend({
        defaults: {
            id: null,
            name: null
        }
    });

    var Labels = Models.Labels = Backbone.Collection.extend({
        model: Label,
        getList: function (id) {
            return this.toJSON();
        },
        addLabel: function (attrs) {
            this.push(new Label(attrs));
        }
    });

    var Message = Models.Message = Backbone.Model.extend({
        defaults: {
            id: null,
            name: null,
            to: null,
            from: null,
            time: null,
            text: '',
            labels: new Labels()
        }
    });

    var Messages = Models.Messages = Backbone.Collection.extend({
        model: Message,
        url: 'service/messages/getMessages',
        getList: function (id) {
            return this.toJSON();
        },
        addMessage: function (attrs) {
            this.push(new Message(attrs));
        }
    });

    return Models;

});