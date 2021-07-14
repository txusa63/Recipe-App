import React, { useState } from 'react'
import Form from './Form';
import Recipes from './Recipes';

const Home = () => {
    const [searchMethod, setSearchMethod] = useState('firstLetter');
    const [data, setData] = useState([]);

    return (
        <div>
            <p>Search API by Choosing Method of Search</p>
            <label>
                Search By: {' '}
                <select
                    name="searchMethod"
                    value={searchMethod}
                    onChange={e => setSearchMethod(e.target.value)}
                >
                    <option value="name" >By Name</option>
                    <option value="firstLetter" >First Letter</option>
                    <option value="category" >Category</option>
                    <option value="countryOfOrigin" >By Nationality</option>
                </select>
            </label>
            <Form 
                searchMethod={searchMethod} 
                setData={setData}
            />
            {<Recipes searchMethod={searchMethod} data={data} />}
        </div>
    )
}

export default Home