﻿define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var Views = {};

/*
    BASIC VIEWS
*/

    var ViewBase = Backbone.View.extend({
        renderTemplate: function (attributes) {
            var html = this.template(attributes);
            html = html.replace(/&lt;/g,'<');
            html = html.replace(/&gt;/g,'>');
            html = _.template(html, attributes);
            this.$el.html(html);
        }
    });

    var ModelView = ViewBase.extend({

        template: _.template($('#modelbase').html()),

        viewSize: 1,

        events: {
            "click .model": "toggle"
        },

        initialize: function() {
            if (this.options.viewSize) {
                this.viewSize = this.options.viewSize;
            }
            this.listenTo(this.model, "change", this.render);
        },

        toggle: function () {
            this.model.toggle();
        },

        render: function () {
            this.renderTemplate(_.extend(this.model.attributes, {modelType: this.model.type, viewSize: this.viewSize }));
			if (_.isFunction(this.renderFinal)) {
				this.renderFinal();
			}
            return this;
        }

    });

    var CollectionView = ViewBase.extend({

        template:_.template($('#collectionbase').html()),

        viewSize: 1,

        initialize: function() {
            if (this.options.viewSize) {
                this.viewSize = this.options.viewSize;
            }
//            this.listenTo(this.collection, "change", this.render);
            this.listenTo(this.collection, "add", this.render);
        },

        render: function () {
            var self = this;
//            var $modelViews = $('<div></div>');
//            var modelViews = [];
            this.renderTemplate({ name: this.collection.getName(), collectionType: this.collection.type, viewSize: this.viewSize });
            this.collection.forEach(function(model){
                var ModelViewOfCollection = ModelView.extend({
                    viewSize: self.viewSize
                });
                var modelViewOfCollection = new ModelViewOfCollection({
                    model: model
                });
                $(self.el).find(".models").append(modelViewOfCollection.render().el);
            });
            if (_.isFunction(this.renderFinal)) {
                this.renderFinal();
            }
            return this;
        }

    });

/*
    VIEWS FOR MODELS
*/

    Views.SmallModel = ModelView.extend({
        viewSize: 1
    });

    Views.MiddleModel = ModelView.extend({
        viewSize: 2/*,
        events: {
            "click .model": "toggle"
        },
        toggle: function () {
            this.model.toggle();
        }*/
    });

    Views.LargeModel = ModelView.extend({
        viewSize: 3
    });

/*
    VIEWS FOR COLLECTIONS
*/

    Views.SmallCollection = CollectionView.extend({
        viewSize: 2
    });

    Views.MiddleCollection = CollectionView.extend({
        viewSize: 2
    });

    Views.LargeCollection = CollectionView.extend({
        viewSize: 3
    });

    return Views;

});