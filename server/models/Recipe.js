const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const RecipeSchema = new mongoose.Schema({
    recipeId: {type: String, required: true},
    recipeName: {type: String, required: true},
    category: {type: String, required: true},
    ingredients: [String],
    instructions: {type: String, required: true},
    countryOfOrigin: {type: String, required: true},
    imageData: {type: String, required: true},
    userId: {type: String, required: true},
},
{
    timestamps: true
});

const Recipe = mongoose.model("recipe", RecipeSchema);
module.exports = Recipe;
