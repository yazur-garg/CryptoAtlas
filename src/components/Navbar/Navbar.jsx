import React, { useContext } from "react";

import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext);
    const handleCurrencyChange = (e) => {
        switch(e.target.value) {
            case "cad":
                setCurrency({name: "cad", symbol: "CAD $"});
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
                setCurrency({name: "cad", symbol: "CAD $"});
        };
    }

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
                <select onChange={handleCurrencyChange}>
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="inr">INR</option>
                </select>
                <button>Sign up</button>
            </div>
        </div>
    );
}

export default Navbar;