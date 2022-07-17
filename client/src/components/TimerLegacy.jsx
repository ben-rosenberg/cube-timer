import { useEffect, useRef, useState } from 'react';

import '../style.css';

class Time {
    constructor() {
        this.cs = 0;
        this.s = 0;
        this.m = 0;
    }

    increment() {
        this.cs++;

        if (this.cs >= 100) {
            this.cs = 0;
            this.s++;

            if (this.s >= 60) {
                this.s = 0;
                this.m++;
            }
        }

        return this;
    }

    reset() {
        this.cs = 0;
        this.s = 0;
        this.m = 0;

        return this;
    }

    padZero(val) {
        if (val < 10) {
            return '0' + val.toString();
        }

        return val.toString();
    }

    displayString() {
        return this.padZero(this.m) + ':' + this.padZero(this.s) + '.' + this.padZero(this.cs);
    }
}

const INIT_TIME = '00:00.00';

const Timer = (props) => {
    const [ ticks, setTicks ] = useState(0);
    const [ time, setTime ] = useState(INIT_TIME);

    const [ cs, setCs ] = useState(0);
    const [ s, setS ] = useState(0);
    const [ m, setM ] = useState(0);

    const idRef = useRef(0);

    const padZero = (val) => {
        if (val < 10) {
            return '0' + val.toString();
        }

        return val.toString();
    }

    const increment = () => {
        setTicks(prevTicks => prevTicks + 1);

        if (ticks + 1 >= 100) {
            setS(prevS => prevS + 1);

            if (s >= 60) {
                setM(prevM => prevM + 1);
                setS(0);
            }
            setCs(0);
            setTicks(0);
        }
    }

    const displayTime = () => {
        const csa = ticks % 100;
        const sa = (ticks - csa) / 100;
        const ma = Math.floor(ticks / 6000);

        const str = padZero(ma) + ':' + padZero(sa) + '.' + padZero(csa);

        return str;
    }

    const handleKeydown = (event) => {
        if (idRef.current !== 0) {
            clearInterval(idRef.current);
            idRef.current = 0;
            return;
        }

        if (event.key !== ' ' && event.key !== 'Spacebar') {
            return;
        }

        setTicks(0);
        //setTime(time.reset());
        window.addEventListener('keyup', handleKeyup, { once: true });
    }

    const handleKeyup = () => {
        if (idRef.current !== 0) {
            return;
        }

        idRef.current = setInterval(() => {
            //setTicks(t => t + 1);
            increment();
            //setTime(displayTime());
            //setTime(time.increment());
        }, 10);

        window.addEventListener('keydown', handleKeydown, { once: true });
    }

    useEffect(() => {
        console.log('new render');
        
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
    }, [ ]);

    return (
        <div>
            <h1 className="text_center">Timer</h1>
            <h2>Time: { padZero(m) }:{ padZero(s) }.{ padZero(ticks) }</h2>
            <h2>TimeStr: { displayTime() }</h2>
        </div>
    );
};

export default Timer;