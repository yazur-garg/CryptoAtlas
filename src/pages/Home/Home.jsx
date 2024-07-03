import React, { useEffect, useContext, useState } from "react";

import "./Home.css";
import { CoinContext } from "../../context/CoinContext";

const Home = () => {

    const {allCoins, currency} = useContext(CoinContext);
    const [coinsDisplayed, setCoinsDisplayed] = useState([]);

    useEffect(() => {
        setCoinsDisplayed(allCoins.slice(0, 10));
    }, [allCoins]);

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
                {
                    coinsDisplayed.map((coin, index) => (
                        <div className="table-layout" key={index}>
                            <p>{coin.market_cap_rank}</p>
                            <div>
                                <img src={coin.image} alt="coin" />
                                <p>{coin.name + " - " + coin.symbol}</p>
                            </div>
                            <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
                            <p className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p style={{textAlign: "right"}}>{currency.symbol} {coin.market_cap.toLocaleString()}</p>                            
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;