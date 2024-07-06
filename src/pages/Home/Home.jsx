import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import Loader from "../../components/Loader/Loader";

export const formatNumber = (num) => {
  if (num >= 1e12) {
      return (num / 1e12).toFixed(2).replace(/\.00$/, '') + 'T';
  } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';
  } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';
  } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
      return num.toString();
  }
}

const Home = () => {

  const {allCoins, currency} = useContext(CoinContext);
  const [coinsDisplayed, setCoinsDisplayed] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setCoinsDisplayed(allCoins.slice(0, 10));
    }, 300);
  }, [allCoins]);

  const handleSearchInput = (event) => {
      setSearchInput(event.target.value);
      if (event.target.value === "") 
          setCoinsDisplayed(allCoins.slice(0, 10));
  };

  const handleSearch = async (event) => {
      event.preventDefault();
      const filteredCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(searchInput.toLowerCase()));
      console.log(filteredCoins);
      setCoinsDisplayed(filteredCoins);
  };

  return (
      <div className="home">
          <div className="hero">
              <h1>Explore the World <br/> of Digital Currencies</h1>
              <p>Discover, track, and analyze every coin and token in the market.</p>
              <form onSubmit={handleSearch}>
                  <input type="text" placeholder="Search Coin" list="coinList" value={searchInput} onChange={handleSearchInput} required/>
                  <datalist id="coinList">
                    {allCoins.map((coin, index) => (
                        <option key={index} value={coin.name} />
                    ))}
                  </datalist>
                  <button type="submit">Search</button>
              </form>
          </div>
          {
            coinsDisplayed.length !== 0 ?
            <div className="crypto-table">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coin's Name</p>
                    <p>Price</p>
                    <p style={{textAlign: "center"}}>24H change</p>
                    <p className="market-cap">Market Cap</p>
                </div>
                {
                    coinsDisplayed.map((coin, index) => (
                        <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
                            <p>{coin.market_cap_rank}</p>
                            <div>
                                <img src={coin.image} alt="coin" />
                                <p>{coin.name + " - " + coin.symbol}</p>
                            </div>
                            <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
                            <p className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p className="market-cap">{currency.symbol} {formatNumber(coin.market_cap)}</p>                            
                        </Link>
                    ))
                }
            </div>
            : <div className="loader">
              <Loader />
            </div>
          }
      </div>
  );
}

export default Home;