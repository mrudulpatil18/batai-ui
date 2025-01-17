import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as apiService from '../api/auth_api';
import './Auth.css';

type Errors = {
    username?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
};

type AuthMode = 'login' | 'register';

function Auth() {
    const [mode, setMode] = useState<AuthMode>('login');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        if (!username) {
            newErrors.username = 'Username is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        if (mode === 'register') {
            if (!confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        setErrors({});
        try {
            let userData;
            if (mode === 'login') {
                userData = await apiService.login(username, password);
            } else {
                userData = await apiService.register(username, password);
                // Automatically log in after successful registration
                userData = await apiService.login(username, password);
            }
            
            userData.username = username;
            authLogin(userData);
            navigate('/profile');
        } catch (error) {
            console.error(`${mode} error:`, error);
            setErrors({
                form: error instanceof Error
                    ? error.message
                    : `${mode === 'login' ? 'Login' : 'Registration'} failed. Please try again.`
            });
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
        setErrors({});
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-form-container">
                <div className="brand">
                    <h1 className="brand-name">
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="brand-tagline">
                        {mode === 'login' 
                            ? 'Sign in to continue to your account' 
                            : 'Sign up to get started'}
                    </p>
                </div>
                
                {errors.form && (
                    <div className="error-message">
                        {errors.form}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={errors.username ? 'error' : ''}
                        />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    {mode === 'register' && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && (
                                <span className="field-error">{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    <button type="submit" className="submit-button">
                        {mode === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>

                    <div className="mode-switch">
                        <span>
                            {mode === 'login' 
                                ? "Don't have an account? " 
                                : "Already have an account? "}
                        </span>
                        <button 
                            type="button" 
                            onClick={switchMode} 
                            className="switch-button"
                        >
                            {mode === 'login' ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;