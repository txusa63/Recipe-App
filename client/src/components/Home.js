import React from "react";
import RecipeList from "./RecipeList";

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            letter: "",
            isFromSaved: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
        this.setState({
            letter: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h3>Search API with the first letter of the recipe</h3>
                <form>
                    <div>
                        <label>Enter letter below:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.letter}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
                {(() => {
                    if(this.state.letter !== "") {
                        return (
                            <RecipeList
                                letter={this.state.letter}
                                isFromSaved={this.state.isFromSaved}
                            />
                        )
                    }
                })()}
            </div>
        )
    }
}
