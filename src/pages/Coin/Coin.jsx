import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import "./Coin.css";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";
import Loader from "../../components/Loader/Loader";

const Coin = () => {
    const { coinId } = useParams();
    const { currency } = useContext(CoinContext);
    const [coinData, setCoinData] = useState(null);
    const [coinHistoricalData, setCoinHistoricalData] = useState(null);


    const fetchCoinData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(response => response.json())
            .then(response => setCoinData(response))
            .catch(err => console.error(err));
    };

    const fetchCoinHistoricalData = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY}
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`, options)
            .then(response => response.json())
            .then(response => setCoinHistoricalData(response))
            .catch(err => console.error(err));
    };

    useEffect(() => {
            fetchCoinData();
    }, []);

    useEffect(() => {
        fetchCoinHistoricalData();
    }, [currency]);

    if (coinData && coinHistoricalData) {
        return (
            <div className="coin">
                <div className="coin-name">
                    <img src={coinData.image.large} alt={coinData.name} />
                    <h1>{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
                </div>
                <div className="coin-chart">
                    <LineChart historicalData={coinHistoricalData} />
                </div>
                <div className="coin-info">
                    <div className="coin-info-item">
                        <p className="info-heading">Crypto Market Rank</p>
                        <p>{coinData.market_cap_rank}</p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">Price</p>
                        <p>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">Market Cap</p>
                        <p>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">24 Hour High</p>
                        <p>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">24 Hour Low</p>
                        <p>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">24h Change</p>
                        <p>
                            {currency.symbol} {coinData.market_data.price_change_24h_in_currency[currency.name].toLocaleString()}&nbsp;
                            <span className={coinData.market_data.price_change_percentage_24h_in_currency[currency.name] > 0 ? 'green' : 'red'}>
                                ({coinData.market_data.price_change_percentage_24h_in_currency[currency.name].toFixed(4)}%)
                            </span>
                        </p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">7d Change</p>
                        <p className={coinData.market_data.price_change_percentage_7d_in_currency[currency.name] > 0 ? 'green' : 'red'}>
                            {coinData.market_data.price_change_percentage_7d_in_currency[currency.name].toFixed(4)}%
                        </p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">30d Change</p>
                        <p className={coinData.market_data.price_change_percentage_30d_in_currency[currency.name] > 0 ? 'green' : 'red'}>
                            {coinData.market_data.price_change_percentage_30d_in_currency[currency.name].toFixed(4)}%
                        </p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">60d Change</p>
                        <p className={coinData.market_data.price_change_percentage_60d_in_currency[currency.name] > 0 ? 'green' : 'red'}>
                            {coinData.market_data.price_change_percentage_60d_in_currency[currency.name].toFixed(4)}%
                        </p>
                    </div>
                    <div className="coin-info-item">
                        <p className="info-heading">1y Change</p>
                        <p className={coinData.market_data.price_change_percentage_1y_in_currency[currency.name] > 0 ? 'green' : 'red'}>
                            {coinData.market_data.price_change_percentage_1y_in_currency[currency.name].toFixed(4)}%
                        </p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="loading">
                <Loader />
            </div>
        );
    }
}

export default Coin;