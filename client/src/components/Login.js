import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css'

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });

            props.setUsersServers(mutationResponse.data.login.user.servers)
            window.localStorage.setItem('servers', JSON.stringify(mutationResponse.data.login.user.servers))
            console.log('mutation', mutationResponse.data.login.user.servers)

            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleFormSubmit}>
                <h3>Login</h3>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email
                    </label><br />
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" className="form-label">Password
                    </label><br />
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <p className="form-redirect">
                    Need a new account?<br />
                    Click here to <a href="/signup">Sign Up</a>
                </p>
                <button className="form-input-btn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
