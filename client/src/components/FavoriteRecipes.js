import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FavoriteRecipe from './FavoriteRecipe';

const FavoriteRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipesFromDB();
    }, [])

    const getRecipesFromDB = async () => {
        const recipeRes = await axios.get('/recipes/');
        setRecipes(recipeRes.data);
    };

    const renderFavoriteRecipes = () => {
        if(recipes.length !== 0) {
            return recipes.map((recipe, i) => {
                return (
                    <li key={recipe._id}>
                        <FavoriteRecipe id={recipe._id}
                                        recipeId={recipe.recipeId}
                                        recipeName={recipe.recipeName}
                                        category={recipe.category}
                                        ingredients={recipe.ingredients}
                                        instructions={recipe.instructions}
                                        countryOfOrigin={recipe.countryOfOrigin}
                                        imageData={recipe.imageData}
                                        getRecipesFromDB={getRecipesFromDB}
                        />
                    </li>
                )
            })
        }
        else {
            return ''
        }
    }

    return (
        <div>
            <h1>Favorite Recipes</h1>
            {recipes.length !== 0 ? (
                <>
                    <ul style={{listStyleType: 'none'}}>{renderFavoriteRecipes()}</ul>
                </>
            ): ''}
        </div>
    )
}

export default FavoriteRecipes;
