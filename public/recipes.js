window.Recipe = Backbone.Model.extend({});

window.RecipeSummaryView = Backbone.View.extend({
	//el: '#recipeList',
	tagName: 'li',
	className: 'recipe',
	initialize: function() {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.template = _.template($('#recipeSummaryTemplate').html());
	},
	
	render: function() {
		var renderedContent = this.template(this.model.toJSON());
		$(this.el).html(renderedContent);
		return this;
	}		
});

$(function(){
	var recipe = new Recipe({name:'Shepu chi Bhaji', chef:'Rieethaa'});
	var recipeView = new RecipeSummaryView({model:recipe});
	recipeView.render();
	$('#recipeList').append(recipeView.el);
	
	var recipeAnother = new Recipe({name:'Bangan Ka Bharta', chef:'Stevey'});
	var recipeAnotherView = new RecipeSummaryView({model:recipeAnother});
	recipeAnotherView.render();
	$('#recipeList').append(recipeAnotherView.el); 
});