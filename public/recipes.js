window.Recipe = Backbone.Model.extend({});

// RecipeSummaryView is a constructor function hence R n capital
window.RecipeSummaryView = Backbone.View.extend({
	//el: '#recipeList',
	tagName: 'li',
	className: 'recipe',
	events: {
		'click .summary': 'toggleDetails'
	},
	initialize: function() {
		_.bindAll(this, 'render', 'toggleDetails');
		this.model.bind('change', this.render);
		this.template = _.template($('#recipeSummaryTemplate').html());
	},
	
	render: function() {
		var renderedContent = this.template(this.model.toJSON());
		$(this.el).html(renderedContent);
		return this;
	},
	
	toggleDetails: function(){
		// we need to tell the view which element it maps to using a scoped selector because in the whole
		// document there will be more than 1 'details' divs. Hence we need to pass el as a parameter to the 
		// constructor function 
		
		if (!this.detailsView) {
			this.detailsView = new RecipeDetailView({el: this.$('.details')[0], model: this.model});
			this.detailsView.render();
		} else {
			this.detailsView.toggle();
		}
	}
});


window.RecipeDetailView = Backbone.View.extend({
	
	initialize: function(){
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
		this.template = _.template($('#recipeDetailTemplate').html());
	},
	
	render: function(){
		var renderedContent =  this.template(this.model.toJSON());
		$(this.el).html(renderedContent);
		return this;
	},
	
	toggle: function(){
		$(this.el).slideToggle(400, function(){
			//add animation here
		});
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
	
	var recipe = new Recipe({name:'Shepu chi Bhaji', chef:'Rieethaa', ingredients: ['Dill', 'garlic', 'green chillies'] , steps: '1) Take the fresh dill and start picking it including leaves and stalks into a clean bowl without washing it. 2) Coarsly chop the sorted dill on a chopping board in a random manner. 3) Now, pour some tap water into the bowl containing chopped dill. 4) Run your fingers into the bowl containing water such that grit seperates from the dill into the water. 5) Next step is a secret. Bribe me :)'});
	
	var recipeAnother = new Recipe({name:'Baingan Ka Bharta', chef:'Stevey', ingredients: ['garlic with kernels removed'], steps: 'This is definitely a secret. Will see if I should share!'});
	
	var recipes =  new Recipes();
	var recipeListView = new RecipeListView({collection: recipes});
	recipes.reset([recipe, recipeAnother]);
});