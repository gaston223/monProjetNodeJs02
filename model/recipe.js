const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// On definit le schéma des ingrédients (schéma secondaire)
const ingredientsSchema = new Schema({
    name : String,
    unit : String, 
    quantity : Number
});

//On définit le schéma (la "structure") de notre recette
const recipeSchema = new Schema({
    name : String,
    introduction : String,
    nbIngredients: Number,
    publishedAt :Date,
    ingredients:[ingredientsSchema]
});




//On créé le schéma (classe qui fait des actions)
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.Recipe=Recipe;
