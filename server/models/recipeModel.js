const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    id: {type: String, required: true},
    recipeName: {type: String, required: true},
    countryOfOrigin: {type: String, required: true},
    dessertType: {type: String, required: true},
    ingredientAmt: [String],
    instructions: {type: String, required: true}
},
{
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
