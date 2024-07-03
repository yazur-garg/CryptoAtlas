import React from "react";

import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="logo"/>
            <ul>
                <li>Home</li>
                <li>Feature</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="navbar-right">
                <select>
                    <option>CAD</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>INR</option>
                </select>
                <button>Sign up</button>
            </div>
        </div>
    );
}

export default Navbar;