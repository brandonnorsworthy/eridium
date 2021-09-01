import React from 'react';
import useForm from './useForm';
import validate from './validateInfo';
import './Login.css'
function Login() {
    const { handleChange, values, handleSubmit, errors } = useForm(validate);

    return (
        <div className="form-content">
            <form className="form" onSubmit={handleSubmit}>
                <p>
                    Sign In
                </p>
                <div className="form-inputs">
                    <label htmlFor="email" className="form-label">Email
                    </label><br />
                    <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-inputs">
                    <label htmlFor="password" className="form-label">Password
                    </label><br />
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <span className="form-input-login">
                    Need an account? <br />Click here to <a href="?">Sign Up</a>
                </span><br />
                <button className="form-input-btn" type="submit">
                    SIGN UP
                </button>

            </form>
        </div>
    )
}

export default Login
