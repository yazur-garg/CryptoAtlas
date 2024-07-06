import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';
import Loader from '../Loader/Loader';

function LineChart({historicalData}) {
    const [data, setData] = useState([["Date", "Price"]]);

    useEffect(() => {
        let dataCopy = [["Date", "Price"]];
        if (historicalData.prices) {
            historicalData.prices.forEach(price => {
                dataCopy.push([`${new Date(price[0]).toLocaleDateString().slice(0,-5)}`, price[1]]);
            });
            setData(dataCopy);
        }
    }, [historicalData]);

    return (
        <Chart 
            width="100%"
            chartType="LineChart"
            loader={<div className='loader'><Loader /></div>}
            data={data}
            options={{
                hAxis: {
                    title: 'Date',
                },
                vAxis: {
                    title: 'Price',
                },
            }}
        />
    )
}

export default LineChart
