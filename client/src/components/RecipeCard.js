import React from "react";
import axios from "axios";
let key1 = 0;

const Ingredient = (props) => {
    return (
        <li>{props.elem}</li>
    )
}

export default class RecipeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            idMeal: "",
            strArea: "",
            strCategory: "",
            strIngredients: [],
            strMeasures: [],
            ingredient_measures: [],
            strInstructions: "",
            recipeName: props.recipeName,
            counter1: 1,
            counter2: 1,
            isFromSaved: props.isFromSaved,
            data: props.data
        }
        this.saveData = this.saveData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.increaseCounter1 = this.increaseCounter1.bind(this);
        this.increaseCounter2 = this.increaseCounter2.bind(this);
        this.generateComponent = this.generateComponent.bind(this);
    };

    componentDidMount() {
        if(this.state.isFromSaved === false) {
            axios("https://www.themealdb.com/api/json/v1/1/search.php?s=" + this.state.recipeName)
                .then(response => {
                    this.setState({
                        idMeal: response.data["meals"]["0"]["idMeal"],
                        strArea: response.data["meals"]["0"]["strArea"],
                        strCategory: response.data["meals"]["0"]["strCategory"],
                        strInstructions: response.data["meals"]["0"]["strInstructions"],
                    });

                    for(let key in response.data["meals"]["0"]) {
                        let iData = response.data["meals"]["0"]["strIngredient" + this.state.counter1];
                        if(iData !== "" && iData !== null && iData !== " ") {
                            if(this.state.counter1 < 21) {
                                let p = this.state.strIngredients.concat(iData);
                                this.setState({
                                    strIngredients: p
                                });
                                this.increaseCounter1();
                            }
                        }

                        let mData = response.data["meals"]["0"]["strMeasure" + this.state.counter2];
                        if(mData !== "" && mData !== null && mData !== " ") {
                            if(this.state.counter2 < 21) {
                                let q = this.state.strMeasures.concat(mData);
                                this.setState({
                                    strMeasures: q
                                });
                                this.increaseCounter2();
                            }
                        }
                    }
                    for(let i=0; i<this.state.strIngredients.length; i++) {
                        let ingredientName = this.state.strIngredients[i];
                        let ingredientMeasured = this.state.strMeasures[i] + "  -  " + ingredientName;
                        this.setState({
                            ingredient_measures: this.state.ingredient_measures.concat(ingredientMeasured)
                        })
                    }
                    console.log(this.state.strIngredients)
                    console.log(this.state.ingredient_measures)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            this.state.data.forEach(elem => {
                if(elem["recipeName"] === this.state.recipeName) {
                    this.setState({
                        _id: elem["_id"],
                        recipeName: elem["recipeName"],
                        strArea: elem["countryOfOrigin"],
                        strCategory: elem["dessertType"],
                        ingredient_measures: elem["ingredientAmt"],
                        strInstructions: elem["instructions"]
                    })
                }
            })
        }
    };

    saveData() {
        const recipe = {
            id: this.state.idMeal,
            recipeName: this.state.recipeName,
            countryOfOrigin: this.state.strArea,
            dessertType: this.state.strCategory,
            ingredientAmt: this.state.ingredient_measures,
            instructions: this.state.strInstructions
        }
        axios.post("http://localhost:3001/recipes/add", recipe)
            .then(res => console.log(res.data));
    };

    deleteData(id) {
        axios.delete("http://localhost:3001/recipes/delete/" + id)
            .then(res => console.log(res.data))


        this.setState({
            data: this.state.data.filter(el => el._id !== id)
        })

        window.location.reload(false)
        window.location.reload(true)
        window.location = "/savedrecipes"
    }

    increaseCounter1() {
        this.setState(prevState => ({
            counter1: prevState.counter1 + 1
        }));
    };

    increaseCounter2() {
        this.setState(prevState => ({
            counter2: prevState.counter2 + 1
        }));
    };

    generateComponent(s) {
        return this.state.ingredient_measures.map(elem => {
            key1++;
            return (
                <Ingredient
                    key={key1}
                    elem={elem}
                />
            );
        });
    }

    render() {
        return (
            <div className="card-border">
                {(() => {
                    if(this.state.isFromSaved === false) {
                        return (
                            <div>
                                <h3 className="labels">{this.state.idMeal}</h3>
                                <h3 className="labels">{this.state.recipeName}</h3>
                                <h3 className="labels">{this.state.strArea}</h3>
                                <h3 className="labels">{this.state.strCategory}</h3>
                                <ul className="lists">{this.generateComponent()}</ul>
                                <p className="instructions">{this.state.strInstructions}</p>

                                <button className="buttons" onClick={() => {this.saveData()}}>
                                    Save
                                </button>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <h3 className="labels">{this.state._id} </h3>
                                <h3 className="labels">{this.state.recipeName}</h3>
                                <h3 className="labels">{this.state.strArea}</h3>
                                <h3 className="labels">{this.state.strCategory}</h3>
                                <ul className="lists">{this.generateComponent()}</ul>
                                <p className="instructions">{this.state.strInstructions}</p>

                                <button className="buttons" onClick={() => {this.deleteData(this.state._id)}} >
                                    Delete
                                </button>

                            </div>
                        )
                    }
                })()}
            </div>
        )
    }
}
