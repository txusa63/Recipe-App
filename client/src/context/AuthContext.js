import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined);
    console.log('loggedIn = ', loggedIn)

    const getLoggedIn = async () => {
        const loggedInResponse = await axios.get('/users/loggedIn');
        setLoggedIn(loggedInResponse.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider}