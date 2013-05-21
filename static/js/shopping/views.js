define([ 'underscore',
    'jquery',
    'backbone'
], function (_, $, Backbone) {
    "use strict";

    var Views = {};

    var ModelView = Backbone.View.extend({

        template: _.template($('#modelbase').html()),

        events: {
            "click p": "open"
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            this.$el.html(this.template(_.extend(this.model.attributes, {modelType: this.model.type, viewSize: this.viewSize })));
			if (_.isFunction(this.renderFinal)) {
				this.renderFinal();
			}
            return this;
        },
        open: function () {
            console.log(this.model);
        }
    });

    Views.SmallModel = ModelView.extend({
        viewSize: 1
    });

    Views.MiddleModel = ModelView.extend({
        viewSize: 2,
		events: {
			"click .model": "playFile"
		},
		playFile: function () {
			this.model.addToPlaylist();
		},
		renderFinal: function () {
			if (this.model.get("added")) {
				this.$el.find(".model").addClass("playlist");
			} else {
				this.$el.find(".model").removeClass("playlist");
			}
		}
    });

    Views.LargeModel = ModelView.extend({
        viewSize: 3
    });

    return Views;

});