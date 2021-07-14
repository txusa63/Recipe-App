import React, { useContext, useState } from "react";
import {NavLink as RRNavLink} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {loggedIn} = useContext(AuthContext);

    const toggleNavbar = () => setIsOpen(!isOpen);

    return (
        <div className=''>
            <Navbar color="warning" light expand='md'>
                <NavbarBrand href='/'>Recipe App</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2"/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {loggedIn === true && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to='/' activeClassName='active'>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to='/favoriteRecipes' activeClassName='active'>Favorite Recipes</NavLink>
                                </NavItem>
                                <Logout />
                            </>
                        )}
                        {loggedIn === false && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to='/register' activeClassName='active'>Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} exact to='/login' activeClassName='active'>Log In</NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header

