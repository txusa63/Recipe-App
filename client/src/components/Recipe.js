import React, {useEffect, useState} from 'react';
import {Alert, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Collapse, CardHeader} from 'reactstrap';
import axios from 'axios';

const Recipe = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [apiData, setApiData] = useState(props.recipe);
    const [visible, setVisible] = useState(false);
    let ingredients = [];
    let ingredient = [];
    let measurements = [];
    let measuredIngredients = [];

    useEffect(() => {
        getAPIData();
    }, [props]);

    const onDismiss = () => setVisible(false);

    const toggle = () => setIsOpen(!isOpen);

    const getAPIData = async () => {
        let apiResponse = null;
        if(props.searchMethod === 'countryOfOrigin' || props.searchMethod === 'category') {
            apiResponse = await axios('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + props.recipe['idMeal']);
            if(apiResponse.data) {
                setApiData(apiResponse.data.meals[0]);
            }
        }
        
        else {
            setApiData(props.recipe);
        }
    }

    const listIngredients = () => {
        ingredients = Object.entries(apiData);
        for(let i=0; i<ingredients.length; i++) {
            for(let k=1; k<=20; k++) {
                if(ingredients[i][0] === 'strIngredient' + k) {
                    if(ingredients[i][1] !== null && ingredients[i][1] !== '' && ingredients[i][1] !== ' ' && ingredients[i][1] !== undefined) {
                        ingredient.push(ingredients[i])
                    }
                }
                if(ingredients[i][0] === 'strMeasure' + k) {
                    if(ingredients[i][1] !== null && ingredients[i][1] !== '' && ingredients[i][1] !== ' ' && ingredients[i][1] !== undefined && ingredients[i][1] !== '  ') {
                        measurements.push(ingredients[i])
                    }
                }
            }
        }

        for(let i=0; i<ingredient.length; i++) {
            if(measurements[i] === undefined) {
                measuredIngredients.push(ingredient[i][1]);
            }
            else {
                measuredIngredients.push(ingredient[i][1] + ' --- ' + measurements[i][1]);
            }
        }
       
        return measuredIngredients.map((value, i) => {
            return <li key={i}>{value}</li>
        });
        
    }

    const saveRecipe = async (e) => {
        try {
            const recipeData = {
                recipeId: apiData['idMeal'],
                recipeName: apiData['strMeal'],
                category: apiData['strCategory'],
                ingredients: measuredIngredients,
                instructions: apiData['strInstructions'],
                countryOfOrigin: apiData['strArea'],
                imageData: apiData['strMealThumb']
            };

            await axios.post('/recipes/add', recipeData);
            setIsOpen(false)
            setVisible(true)
        } 
        
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={{}}>
            <Alert color='success' isOpen={visible} toggle={onDismiss} >Recipe Saved!</Alert>
            <Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }} >{apiData['strMeal']}</Button>
            <Collapse isOpen={isOpen}>
                <Card body outline color='warning'>
                    <CardHeader>{apiData['strMeal'] + ' (' + apiData['strArea'] + ')'}</CardHeader>
                    <CardImg top width="10%" src={apiData['strMealThumb']} />
                    <CardBody>
                        <CardTitle tag='h5'>Category: {apiData['strCategory']}</CardTitle>
                    </CardBody>
                    <CardBody>
                        {apiData['strIngredient1'] ? (
                            <CardTitle tag="h5">Ingredients: </CardTitle>)
                             : null}
                             <ul style={{listStyleType: 'none'}}>{listIngredients()}</ul>
                    </CardBody>
                    <CardBody>
                        {apiData['strInstructions'] ? (<CardTitle tag="h5">Instructions</CardTitle>) : null}
                        <CardText>{apiData['strInstructions']}</CardText>
                        <Button color='success' onClick={saveRecipe}>Save Recipe</Button>
                    </CardBody>
                </Card>
                <br/>
            </Collapse>
        </div>
    )
}

export default Recipe