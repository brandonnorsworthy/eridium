import React from 'react';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css'

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
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
        <div className="form-content">
            <form className="form" onSubmit={handleFormSubmit}>
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
