import axios from 'axios';
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import { Button } from 'reactstrap';

const Logout = () => {
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const logout = async () => {
        await axios.get('/users/logout');
        await getLoggedIn();
        history.push('/')
    }

    return (
        <div>
            <Button color='secondary' onClick={logout}>Log Out</Button>
        </div>
    )
}

export default Logout
