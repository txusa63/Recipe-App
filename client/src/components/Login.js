import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ErrorNotice from './ErrorNotice';
import { Button } from 'reactstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                email: email,
                password: password
            };

            await axios.post('/users/login', loginData );
            await getLoggedIn();
            history.push('/')
        } 

        catch (err) {
            console.error(err);
            err.response.data.errorMessage && setError(err.response.data.errorMessage)
        }
    }

    return (
        <div>
            <h1>Log Into Account</h1>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={login}>
                <input 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button color='secondary' type='submit'>Log in</Button>
            </form>
        </div>
    )
}

export default Login
