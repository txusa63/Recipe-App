import React from "react";
import RecipeList from "./RecipeList";

export default class SavedRecipes extends React.Component {
    constructor() {
        super();
        this.state = {
            isFromSaved: true,
        };
    }

    render() {
        return (
            <div>
                Recipes stored below:
                <RecipeList
                    isFromSaved={this.state.isFromSaved}
                />
            </div>
        )
    }
}
