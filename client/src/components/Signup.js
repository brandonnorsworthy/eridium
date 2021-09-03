import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './Signup.css'

function Signup() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                username: formState.username,
                email: formState.email,
                password: formState.password
            }
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    return (
        <div className="form-content">
            <form className="form" onSubmit={handleFormSubmit}>
                <p>
                    Sign Up
                </p>
                <div className="form-inputs">
                    <label htmlFor="username" className="form-label">Username
                    </label><br />
                    <input
                        type="username"
                        name="username"
                        className="form-input"
                        placeholder="Username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </div>
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
                <span className="form-input-login">
                    Already have an account? <br />Click here to <a href="?">Login</a>
                </span><br />
                <button className="form-input-btn" type="submit">
                    SIGN UP
                </button>

            </form>
        </div>
    )
}

export default Signup;
