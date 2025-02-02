import { createContext, useEffect, useState } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = ( props ) => {
    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "cad",
        symbol: "$"
    });

    const fetchAllCoins = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoins(response))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAllCoins();
    }, [currency]);
    
    const contextData = {
        allCoins,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={contextData}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;