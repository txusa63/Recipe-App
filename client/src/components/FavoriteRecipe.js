import React, {useState} from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, Button, Collapse, CardHeader} from 'reactstrap';
import axios from 'axios';

const FavoriteRecipe = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [apiData] = useState(props)

    const toggle = () => setIsOpen(!isOpen);

    const displayIngredients = () => {
        return apiData.ingredients.map((value, i) => {
            return <li key={i}>{value}</li>
        })
    }

    const deleteRecipe = async () => {
        try {
            await axios.delete('/recipes/delete/'+props.id);
            props.getRecipesFromDB();
        } 
        
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }} >{apiData['recipeName']}</Button>
            <Collapse isOpen={isOpen}>
                <Card body outline color='warning'>
                    <CardHeader>{apiData['recipeName'] + ' (' + apiData['countryOfOrigin'] + ')'}</CardHeader>
                    <CardImg top width="50%" src={apiData['imageData']} />
                    <CardBody>
                        <CardTitle tag='h5'>Category: {apiData.category}</CardTitle>
                    </CardBody>
                    <CardBody>
                        {apiData.ingredients ? (
                            <CardTitle tag="h5">Ingredients: </CardTitle>)
                             : null}
                            <ul style={{listStyleType: 'none'}}>{displayIngredients()}</ul>
                    </CardBody>
                    <CardBody>
                        {apiData['instructions'] ? (<CardTitle tag="h5">Instructions</CardTitle>) : null}
                        <CardText>{apiData['instructions']}</CardText>
                        <Button color='danger' onClick={() => {deleteRecipe(); toggle();}}>Delete Recipe</Button>
                    </CardBody>
                </Card>
                <br/>
            </Collapse>
        </div>
    )
}

export default FavoriteRecipe;
