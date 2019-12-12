import React from "react";
import RecipeCard from "./RecipeCard";

export default class RecipeTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            callCard: false,
            isFromSaved: props.isFromSaved,
            recipeName: props.item,
            data: props.data,

        }
        this.handleClick = this.handleClick.bind(this)
    };

    handleClick() {
        this.setState({
            callCard: !this.state.callCard
        })
    }

    render() {
        return (
            <div>
                <button className="buttons" onClick={() => {this.handleClick()}}>
                    {this.state.recipeName}
                </button>
                {(() => {
                    if(this.state.callCard === true) {
                        return (
                            <RecipeCard
                                recipeName={this.state.recipeName}
                                callCard={this.state.callCard}
                                data={this.state.data}
                                isFromSaved={this.state.isFromSaved}
                            />
                        )
                    }
                })()}
            </div>
        )
    }
}
