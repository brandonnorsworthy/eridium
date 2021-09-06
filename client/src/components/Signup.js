import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
        try {
            window.localStorage.clear()
            const mutationResponse = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
                }
            });
    
            // console.log('mutation response', mutationResponse.data.addUser.user.servers)
            window.localStorage.setItem('servers', mutationResponse.data.addUser.user.servers)
    
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleFormSubmit}>
                <h3>Sign Up</h3>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email</label>
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
                    <label htmlFor="username" className="form-label">Username</label>
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
                    <label htmlFor="password" className="form-label">Password</label>
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
                    Already have an account?<br />
                    Click here to <a href="/login">Login</a>
                </p>
                <button className="form-input-btn" type="submit">CREATE</button>
            </form>
        </div>
    )
}

export default Signup;
