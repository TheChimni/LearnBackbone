window.Recipe = Backbone.Model.extend({
	
});

window.RecipeView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template($('#recipeTemplate').html());
	},
	
	render: function(){
		var renderedContent = this.template(this.model.toJSON());
		$(this.el).html(renderedContent);
		return this;
	}
});
