import React from "react";
//import useAuth from "../hooks/useAuth.jsx";
import { useFetch } from "../hooks/useFetch.jsx";
import { Link } from "react-router-dom";
import TextInput from "../components/lib/TextInput.jsx";
import Button from "../components/lib/Button.jsx";

const LoginComponent = () => {
    //const { setAuth } = useAuth();
    const { response, error, loading, request } = useFetch();
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        request.post("/api/auth/login", formData, { credentials: "include" });
    };

    const handleInputChange = (event) => {
        const { value, name, checked, type } = event.target;
        const VALUE = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: VALUE }));
    };

    return (
        <div className="login-component">
            <h1 className="login-component__title">Login</h1>
            <div className="login-component__message">
                <p>Start chatting today.</p>
                <p>{response && JSON.stringify(response)}</p>
            </div>
            <form className="login-component__form" onSubmit={handleSubmit}>
                <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleInputChange}
                    error={error?.validationErrors?.email}
                />
                <TextInput
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={formData.password}
                    onChange={handleInputChange}
                    error={error?.validationErrors?.password}
                />

                <div className="login-component__input-group-checkbox">
                    <input
                        onChange={handleInputChange}
                        type="checkbox"
                        name="remember"
                        id="remember"
                    />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <Button type="submit" text="Login" isLoading={loading}/>
            </form>
            <div>
                <span>Dont have an account? </span>
                <Link to="/register">Create an account</Link>
            </div>
        </div>
    );
};

export default LoginComponent;
