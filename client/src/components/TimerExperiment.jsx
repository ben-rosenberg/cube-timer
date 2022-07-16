import { useState } from "react";
import '../style.css';

const TimerExperiment = (props) => {
    const [ ticks, setTicks ] = useState(0);

    const handle = () => {
        const startTime = Date.now();

        window.addEventListener('keydown', (event) => {
            
        }, { once: true });
    }

    const time = (isTiming) => {
        if (!isTiming) {
            return ticks;
        }


    }

    return (
        <h1 className="text_center">{ ticks }</h1>
    );
};

export default TimerExperiment;