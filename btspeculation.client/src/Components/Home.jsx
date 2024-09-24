import { useEffect, useState } from 'react';
import '../Styles/Home.css';
import Chart from './Chart.jsx';


function Home() {
    

    const [State, setState] = useState({
        personalStocks: [],
        tick: "AAPl",
        chartBool: true,
        likeIt: "",
        loveIt: "",
        gotToHaveIt: ""
    });
    

    const AddStockToList = async () => {
        if (State.tick !== "") {
            const response = await fetch("/api/Speculation/GetHistorical/" + State.tick.toUpperCase());
            const result = await response.json();

            setState({
                ...State,
                personalStocks: [...State.personalStocks, { ...result, likeIt: State.likeIt, loveIt: State.loveIt, gotToHaveIt: State.gotToHaveIt }],
                tick: ""
            })
        }
    }

    const RemoveFromList = (itemIndex) => {
        setState({
            ...State,
            personalStocks: State.personalStocks.filter((stock, index) => index !== itemIndex),
            chartBool: false
        })
    }

    const SetChart = () => {
        setState({
            ...State,
            chartBool: true
        })
    }

    return (
        <div className="Home">

            <h1 id="tableLabel">BTSpeculation</h1>

            <div className="CenterAllV">
                <strong><p>{State.tick}</p></strong>
                <input placeholder="Ticker..." value={State.tick} onChange={(e) => setState({ ...State, tick: e.target.value.toUpperCase()})}></input>
                <button className="Thick" onClick={SetChart}>Set Chart</button>
            </div>
            {
                State.chartBool ?
                <>
                    <div className="DisplayFlexCenter">
                        <div className="LLG">
                            <input type="number" onChange={e => setState({...State, likeIt: e.target.value})} placeholder="Like It..."></input>
                            <input type="number" onChange={e => setState({ ...State, loveIt: e.target.value })} placeholder="Love It..."></input>
                            <input type="number" onChange={e => setState({ ...State, gotToHaveIt: e.target.value })} placeholder="Got To Have It..."></input>
                        </div>
                        <button className="Thick" onClick={AddStockToList}>Add to list</button>
                    </div>
                
                    <div className="Chart">
                        <Chart tick={State.tick} />
                    </div>
                </> : null
            }

            {
                State.personalStocks.map((stock, index) => {
                    return (
                        <div className="stock-item" key={index}>
                            <div className="stock-details">
                                <strong className="stock-symbol">{stock.symbol}</strong>
                                <p>Open: {stock.open}</p>
                                <p>Close: {stock.close}</p>
                                <p>High: {stock.high}</p>
                                <p>Low: {stock.low}</p>
                                <p>Volume: {stock.volume}</p>
                            </div>
                            <div>
                                <p className={stock.close < parseFloat(stock.likeIt) ? "Green" : "Red" }>Like It: {stock.likeIt}</p>
                                <p className={stock.close < parseFloat(stock.loveIt) ? "Green" : "Red" }>Love It: {stock.loveIt}</p>
                                <p className={stock.close < parseFloat(stock.gotToHaveIt) ? "Green" : "Red" }>Got To Have It: {stock.gotToHaveIt}</p>
                            </div>
                            <button className="remove-button" onClick={() => RemoveFromList(index)}>Remove</button>
                        </div>
                    );
                })
            }

            
        </div>
    );
    
}

export default Home;