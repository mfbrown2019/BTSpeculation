import { useEffect, useState } from 'react';
import '../Styles/Home.css';
import Tape from './Tape.jsx'

function Home() {

    const [State, setState] = useState({
        count: 1,
        msg: "",
        personalStocks: [],
        tick: ""
    });

    const increment = () => {
        setState({
            ...State,
            count: State.count + 1
        })
    }

    const AddStockToList = async () => {
        if (State.tick !== "") {
            const response = await fetch("/api/Speculation/GetHistorical/" + State.tick.toUpperCase());
            const result = await response.json();

            setState({
                ...State,
                personalStocks: [...State.personalStocks, result],
                tick: ""
            })
        }
    }

    const RemoveFromList = (itemIndex) => {
        setState({
            ...State,
            personalStocks: State.personalStocks.filter((stock, index) => index !== itemIndex)
        })
    }

    return (
        <div className="Home">
            <Tape />
            <h1 id="tableLabel">BTSpeculation</h1>
            <button onClick={increment}>Refresh</button>
            
            <div>
                <input placeholder="Ticker" value={State.tick} onChange={e => setState({ ...State, tick: e.target.value })}></input>
                <button onClick={AddStockToList}>Add to list</button>
            </div>

            {
                State.personalStocks.map((stock, index) => {
                    return <div className="PersonalList" key={index}>
                                <div className="DisplayInLIne">
                                    <strong><p>{stock.symbol}</p></strong>
                                    <p>Open: {stock.open}</p>
                                    <p>Close: {stock.close}</p>
                                    <p>High: {stock.high}</p>
                                    <p>low: {stock.low}</p>
                                    <p>Volume: {stock.volume}</p>
                                </div>
                                
                                <button onClick={ () => RemoveFromList(index) }>X</button>
                           </div>
                })
            }

            
        </div>
    );
    
}

export default Home;