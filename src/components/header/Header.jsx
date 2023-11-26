import React from 'react';
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();

    const onLogoContainerClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const onSignUpClick = useCallback(() => {
        navigate("/register");
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate("/login");
    }, [navigate]);

    
    return (
        <div className="header">
            <div className="header-item" />
            <div className="logo" onClick={onLogoContainerClick}>
                <div className="kidtube1">
                    Kidtube
                </div>
                <img className="group-icon" alt="" src="/group-2441.svg" />
            </div>
            <input className="search" placeholder="Search" type="text" />
            <button className="sign-up" onClick={onSignUpClick}>
                <div className="button1">
                    Sign up
                </div>
            </button>
            <button className="login" onClick={onLoginClick}>
                <div className="buttonlogin">
                Sign in
                </div>
            </button>
        </div>
    )
}


export default Header