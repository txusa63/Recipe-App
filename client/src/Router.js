import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FavoriteRecipes from './components/FavoriteRecipes';
import Header from './components/Header';
import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import { AuthContext } from './context/AuthContext';

const Router = () => {
    const {loggedIn} = useContext(AuthContext);

    return (
        <BrowserRouter className='container'>
            <Header />
            <Switch>
                {loggedIn === true && (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/favoriteRecipes">
                            <FavoriteRecipes />
                        </Route>
                    </>
                )}
                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <img src='recipe.gif' className='food' alt=''/>
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}

export default Router

