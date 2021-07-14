import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

const Form = ({searchMethod, setData}) => {
    const [userInput, setUserInput] = useState('');
    const [data2, setData2] = useState();
    const [fetchedData, setFetchedData] = useState([]);
    let tempArray = [];

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if(searchMethod === 'name') {
                const apiRes = await axios('https://www.themealdb.com/api/json/v1/1/search.php?s=' + userInput);
                setData(apiRes.data.meals);
            }
            if(searchMethod === 'firstLetter') {
                const apiRes = await axios('https://www.themealdb.com/api/json/v1/1/search.php?f=' + userInput);
                setData(apiRes.data.meals)
            }
            if(searchMethod === 'category') {
                const apiRes = await axios('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + userInput);
                setData(apiRes.data.meals);
            }
            if(searchMethod === 'countryOfOrigin') {
                let apiResponse = null;
                let returnedTarget = null;
                const apiRes = await axios('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + userInput);
                
                if(apiRes.data !== null) {
                    setData(apiRes.data.meals);
                }
            }
        } catch (err) {
            console.error(err);
        }
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    name='' 
                    value={userInput} 
                    onChange={e => setUserInput(e.target.value)}
                />
                <Button color='secondary' type='submit'>Search</Button>
            </form>
        </div>
    )
}

export default Form
