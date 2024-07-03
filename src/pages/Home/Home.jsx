import React from "react";

import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <h1>Explore the World <br/> of Digital Currencies</h1>
                <p>Discover, track, and analyze every coin and token in the market.</p>
                <form>
                    <input type="text" placeholder="Search Coin" />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coin's Name</p>
                    <p>Price</p>
                    <p style={{textAlign: "center"}}>24H change</p>
                    <p style={{textAlign: "right"}}>Market Cap</p>
                </div>
            </div>
        </div>
    );
}

export default Home;