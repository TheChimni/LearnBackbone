window.Recipe = Backbone.Model.extend({});

window.RecipeView = Backbone.View.extend({
	el: '#recipeList',
	//tagName: 'li',
	//className: 'recipe',
	initialize: function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.template = _.template($('#recipeTemplate').html());
	},
	
	render: function() {
		var renderedContent = this.template(this.model.toJSON());
		$(this.el).html(renderedContent);
		return this;
	}
});

$(function(){
	var recipe = new Recipe({name:'Shepu chi Bhaji', chef:'Rieethaa'});
	var recipeView = new RecipeView({model:recipe});
	recipeView.render();
});