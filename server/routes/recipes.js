const router = require("express").Router();
let Recipe = require("../models/recipeModel");

router.get("/", (req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add", (req, res) => {
    const id = req.body.id;
    const recipeName = req.body.recipeName;
    const countryOfOrigin = req.body.countryOfOrigin;
    const dessertType = req.body.dessertType;
    const ingredientAmt = req.body.ingredientAmt;
    const instructions = req.body.instructions;

    const newRecipe = new Recipe({
        id,
        recipeName,
        countryOfOrigin,
        dessertType,
        ingredientAmt,
        instructions,
    });

    newRecipe.save()
        .then(() => res.json("Recipe added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/delete/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json("Recipe deleted"))
        .catch(err => res.status(400).json("Error: " + err));
})

module.exports = router;
