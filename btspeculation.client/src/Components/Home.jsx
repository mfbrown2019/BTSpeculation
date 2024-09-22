import { useEffect, useState } from 'react';
import '../Styles/Home.css';

function Home() {

    const [State, setState] = useState({
        count: 1
    });



    useEffect(() => {
        console.log("here")
    }, [State])

    const increment = () => {
        setState({...State, count: State.count + 1})
    }

    return (
        <div>
            <h1 id="tableLabel">BTSpeculation</h1>
            <h3>{ State.count }</h3>
            <button onClick={ increment }>Refresh</button>
        </div>
    );
    
}

export default Home;