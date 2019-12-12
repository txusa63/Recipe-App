import React from "react";
import axios from "axios";
import RecipeTitle from "./RecipeTitle";

let k = 0;

export default class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: [],
            letter: props.letter,
            data: props.data,
            isFromSaved: props.isFromSaved,
            data_length: props.data_length,
        }
    }
    componentDidMount(props) {
        if(this.state.isFromSaved !== true) {
            axios("https://www.themealdb.com/api/json/v1/1/search.php?f=" + this.state.letter)
            .then(response => {
                response.data["meals"].forEach(elem => {
                    this.setState({
                        meals: this.state.meals.concat(elem["strMeal"])
                    });
                })
            })
            .catch(error => {
                console.log(error)
            });
        }
        if(this.state.isFromSaved === true) {
            axios.get("http://localhost:3001/recipes")
            .then(response => {
                response.data.forEach(elem => {
                    this.setState({
                        meals: this.state.meals.concat(elem["recipeName"])
                    });
                    console.log(this.state.meals)
                    console.log(this.state.data)
                })
                this.setState({
                    data: response.data
                })
            })
        }
    }

    render(props) {
        const mealComponents = this.state.meals.map(item => {
            k++;
            return (
                <RecipeTitle
                    key={k}
                    item={item}
                    data={this.state.data}
                    isFromSaved={this.state.isFromSaved}
                />
            );
        });

        return (
            <div>
                {mealComponents}
                {console.log(this.state.meals)}
            </div>
        )
    }
}
