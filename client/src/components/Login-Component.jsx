import React from "react";

const LoginComponent = () => {
    
    return (
        <div className="login-component">
            <h1 className="login-component__title">
                Login
            </h1>
            <div className="login-component__message">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam voluptates, 
                praesentium repellat perferendis blanditiis, eos a quidem harum tenetur magnam!
            </div>
            <form className="login-component__form">
                <div className="login-component__input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email..." />
                </div>
                <div className="login-component__input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password..." />
                </div>
                <div className="login-component__input-group-checkbox">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                </div>
                <button className="login-component__btn" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default LoginComponent;