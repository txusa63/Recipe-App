import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from './ErrorNotice';
import { Button } from 'reactstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [passwordVerify, setPasswordVerify] = useState();

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const register = async (e) => {
        e.preventDefault();

        try {
            const registerData = {
                email: email,
                password: password,
                passwordVerify: passwordVerify
            };
            await axios.post('/users/register', registerData);
            await getLoggedIn();
            history.push('/');
        } 

        catch (err) {
            console.error(err);
            err.response.data.errorMessage && setError(err.response.data.errorMessage)
        }
    }

    return (
        <div>
            <h1>Register New User</h1>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={register}>
                <input 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Reenter your password'
                    value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                <Button color='secondary' type='submit'>Register</Button>
            </form>
        </div>
    )
}

export default Register
