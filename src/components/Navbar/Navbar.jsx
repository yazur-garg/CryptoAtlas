import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext);
    const handleCurrencyChange = (e) => {
        switch(e.target.value) {
            case "cad":
                setCurrency({name: "cad", symbol: "$"});
                break;
            case "usd":
                setCurrency({name: "usd", symbol: "$"});
                break;
            case "eur":
                setCurrency({name: "eur", symbol: "€"});
                break;
            case "inr":
                setCurrency({name: "inr", symbol: "₹"});
                break;
            default:
                setCurrency({name: "cad", symbol: "$"});
        };
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} alt="logo" className="logo"/>
            </Link>
            <ul>
                <Link to="/">Home</Link>
                <li>Feature</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="navbar-right">
                <select onChange={handleCurrencyChange}>
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
            </div>
        </div>
    );
}

export default Navbar;