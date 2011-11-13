window.Recipe = Backbone.Model.extend({});

// RecipeSummaryView is a constructor function hence R n capital
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


window.Recipes = Backbone.Collection.extend({
	model : Recipe
});

window.RecipeListView = Backbone.View.extend({
	el: '#recipeList',
	initialize: function() {
		_.bindAll(this, 'render');
		this.collection.bind('reset', this.render);
	},
	
	render: function(){
		var $el = $(this.el);
		this.collection.each(function(recipe){
			var recipeView = new RecipeSummaryView({model: recipe});
			recipeView.render();
			$el.append(recipeView.el);
		});
		return this;
	}
});

$(function(){
	
	var recipe = new Recipe({name:'Shepu chi Bhaji', chef:'Rieethaa'});
	
	var recipeAnother = new Recipe({name:'Baingan Ka Bharta', chef:'Stevey'});
	
	var recipes =  new Recipes();
	var recipeListView = new RecipeListView({collection: recipes});
	recipes.reset([recipe, recipeAnother]);
	// recipes.each(function(r){
	// 	var recipeView = new RecipeSummaryView({model: r});
	// 	recipeView.render();
	// 	$('#recipeList').append(recipeView.el);	
	// });
	
});