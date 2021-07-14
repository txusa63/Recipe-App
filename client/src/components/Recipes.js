import React, { useState } from 'react'
import Recipe from './Recipe'

const Recipes = ({searchMethod, data}) => {
    const [recipes, setRecipes] = useState([]);

    const renderRecipes = () => {
        if(data === null || data === undefined) {
            data = []
        }
        if(data.length !== 0) {
            return data.map((recipe, i) => {
                return <li key={i} style={{}} ><Recipe searchMethod={searchMethod} recipe={recipe} /></li>
            })
        }
        else {
            return 'Nothing Found'
        }
    }

    return (
        <div>
            <ul style={{listStyleType: 'none'}}>{renderRecipes()}</ul>
        </div>
    )
}

export default Recipes
