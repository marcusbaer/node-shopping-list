define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var Views = {};


    var MessageBase = Backbone.View.extend({

        tagName: "div",

        className: "message-",
        template: _.template('<p><%=name%></p>'),

        events: {
            "click p": "open"
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        open: function () {
            console.log(this.model);
        }
    });

    Views.SmallMessage = MessageBase.extend({
        className: "message-small",
        template: _.template('<p><%=name%></p>')
    });

    Views.MiddleMessage = MessageBase.extend({
        className: "message-middle",
        template: _.template('<p><%=name%></p>')
    });

    Views.LargeMessage = MessageBase.extend({
        className: "message-large",
        template: _.template('<p><%=name%></p>')
    });

    var MessagesBase = Backbone.View.extend({

        tagName: "div",

        className: "messages-",
        template: _.template(''),
        itemViews: {},
        itemView: Views.SmallItem,

        events: {
//            "click .icon": "open"
        },

        initialize: function() {
            this.listenTo(this.collection, "change", this.render);
        },
        render: function () {
            var self = this;
            this.$el.html(this.template(this.lang || {}));
            this.collection.forEach(function(model){
                var itemView = new self.itemView({
                    model: model
                });
                self.itemViews[model.id] = itemView;
                self.$el.append(itemView.render().el);
            });
            return this;
        }
    });

    Views.SmallListMessages = MessagesBase.extend({
        className: "messages-small",
        itemView: Views.SmallMessage,
        template: _.template('<h3>SMALL Messages</h3>')
    });

    Views.MiddleListMessages = MessagesBase.extend({
        className: "messages-middle",
        itemView: Views.MiddleMessage,
        template: _.template('<h3>MIDDLE Messages</h3>')
    });

    Views.LargeListMessages = MessagesBase.extend({
        className: "messages-large",
        itemView: Views.LargeMessage,
        template: _.template('<h3>LARGE Messages</h3>')
    });

    return Views;

});