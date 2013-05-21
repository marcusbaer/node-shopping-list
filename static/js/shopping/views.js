define([ 'underscore',
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
            "click p": "open"
        },

        initialize: function() {
            if (this.options.viewSize) {
                this.viewSize = this.options.viewSize;
            }
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            this.renderTemplate(_.extend(this.model.attributes, {modelType: this.model.type, viewSize: this.viewSize }));
			if (_.isFunction(this.renderFinal)) {
				this.renderFinal();
			}
            return this;
        },

        open: function () {
            console.log(this.model);
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
            var modelViews = $('<div></div>');
            this.collection.forEach(function(model){
                var modelViewOfCollection = new ModelView({
                    viewSize: self.viewSize,
                    model: model
                });

                modelViews.append(modelViewOfCollection.render().el);
            });
            this.renderTemplate({ collectionType: this.collection.type, viewSize: this.viewSize, modelViews: modelViews.html() });
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
        viewSize: 2
    });

    Views.LargeModel = ModelView.extend({
        viewSize: 3
    });

/*
    VIEWS FOR COLLECTIONS
*/

    Views.MiddleCollection = CollectionView.extend({
        viewSize: 2
    });

    return Views;

});