import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.jsx";
import { useFetch } from "../hooks/useFetch.jsx";
import TextInput from "../components/lib/TextInput.jsx";
import CheckBox from "../components/lib/CheckBox.jsx";
import LoadingButton from "../components/lib/LoadingButton.jsx";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const { auth } = useAuth();
    const { response, error, isLoading, request } = useFetch();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordRepeat: "",
        handle: "",
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        setFormData((prev) => ({ ...prev, [target.name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        request.post("/api/auth/register", formData);
    };

    useEffect(() => {
        if (response?.ok) {
            return navigate("/login", { replace: true });
        }
    }, [navigate, response]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            return navigate("/", { replace: true });
        }
    }, [auth, navigate]);

    return (
        <div className="auth">
            <h1 className="auth__title">Register</h1>
            <div className="auth__message">
                <p>Please fill in this form to create your free account.</p>
            </div>
            <hr />
            <form className="auth__form" onSubmit={handleSubmit} noValidate>
                <TextInput
                    required
                    id="firstName"
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name..."
                    value={formData.firstName}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.firstName}
                />
                <TextInput
                    required
                    id="lastName"
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Enter your first name..."
                    value={formData.lastName}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.lastName}
                />

                <TextInput
                    required
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={formData.password}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.password}
                />
                <TextInput
                    required
                    id="passwordRepeat"
                    label="Confirm Password"
                    type="password"
                    name="passwordRepeat"
                    placeholder="Confirm password..."
                    value={formData.passwordRepeat}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.passwordRepeat}
                />

                <TextInput
                    required
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    value={formData.email}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.email}
                />
                <TextInput
                    required
                    id="handle"
                    label="Handle"
                    type="text"
                    name="handle"
                    placeholder="Choose a handle..."
                    value={formData.handle}
                    onChange={handleChange}
                    error={error?.data?.validationErrors?.handle}
                />
                <CheckBox
                    id="checkbox"
                    label="I agree to terms and conditions"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                />
                <LoadingButton type="submit" text="Sign Up" loading={isLoading} />
            </form>
            <div>
                <span>have an account? </span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default RegisterComponent;
