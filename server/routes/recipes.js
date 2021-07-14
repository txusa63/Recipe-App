const router = require("express").Router();
const Recipe = require("../models/Recipe");
const auth = require('../middleware/auth');

router.get("/", auth, async (req, res) => {
    try {
        const recipes = await Recipe.find({userId: req.user});
        res.json(recipes);
    } 

    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({userId: req.user, _id: req.params.id});
        if(!recipe) {
            return res.status(400).json({errorMessage: 'No recipe found associated with user'});
        }
        res.json(recipe);
    } 

    catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

router.post("/add", auth, async (req, res) => {
    try {
        const {recipeId, recipeName, category, ingredients, instructions, countryOfOrigin, imageData} = req.body;

        const newRecipe = new Recipe({
            recipeId,
            recipeName,
            category,
            ingredients,
            instructions,
            countryOfOrigin,
            imageData,
            userId: req.user
        });

        const savedRecipe = await newRecipe.save();
        res.json(savedRecipe);
    } 
    
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.delete("/delete/:id", auth, async (req, res) => {
    const recipe = await Recipe.findOne({userId: req.user, _id: req.params.id});
    if(!recipe) {
        return res.status(400).json({errorMessage: 'No recipe found associated with user'})
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    res.json("msg " + deletedRecipe);
})

module.exports = router;
