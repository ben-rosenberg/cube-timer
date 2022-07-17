import { useRef, useEffect, useState } from "react";

import calculateTime from "../utils/calculateTime";
import '../style.css';

const TIMING_PRECISION = 10;
const KEYDOWN_TIMER_START_DELAY = 500;
const TIME_COLORS = {
    default: 'black',
    notReady: 'red',
    ready: 'green',
    timing: 'black'
}

const TimerExperiment = (props) => {
    const [ ticks, setTicks ] = useState(0);
    const [ timeColor, setTimeColor ] = useState(TIME_COLORS.default);

    const isTimingRef = useRef(false);
    const intervalIdRef = useRef(0);

    const prepareToTime = (event) => {
        if (isTimingRef.current || (event.key !== ' ' && event.key !== 'Spacebar') || event.repeat) {
            return;
        }

        let isReady = false;
        setTimeColor(TIME_COLORS.notReady);

        const timeoutId = setTimeout(() => {
            isReady = true;
            setTimeColor(TIME_COLORS.ready);
            setTicks(0);
        }, KEYDOWN_TIMER_START_DELAY);

        window.addEventListener('keyup', () => {
            beginTiming(isReady, timeoutId);
        }, { once: true })
    };

    /**
     * Begins timing if the user held the spacebar key for longer than the
     * KEYDOWN_TIMER_START_DELAY constant. This avoids inadvertant timer
     * starts, as isReady will be true if and only if the timeout in
     * prepareToTime() completes. In either case the timeout is cleared and
     * the color of the display time is returned to its default.
     * 
     * If isReady is true, the isTimingRef ref's .current is set to true, the
     * time() function is called, and the window listens for a keydown event,
     * after which stopTiming() is called.
     * 
     * @param {Boolean} isReady The boolean value indicating whether the user
     * held the space key long enough.
     * @param {Number} timeoutId The ID of the timeout that determines whether
     * the user held the spacebar long enough.
     */
    const beginTiming = (isReady, timeoutId) => {
        clearTimeout(timeoutId);
        setTimeColor(TIME_COLORS.default);

        if (!isReady) {
            return;
        }

        isTimingRef.current = true;
        time();

        window.addEventListener('keydown', stopTiming, { once: true });
    };

    /**
     * Increments ticks by 1 every TIMING_PRECISION milliseconds. The interval
     * is cancelled during timing when any key is pressed.
     * 
     * @param {Number} currTicks The current number of milliseconds since the
     * timer start.
     */
    const time = () => {
        intervalIdRef.current = setInterval(() => {
            setTicks(prevTicks => prevTicks + 1);
        }, TIMING_PRECISION);
    };

    const stopTiming = () => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = 0;
        isTimingRef.current = false;
    }

    /** Adds the prepareToTime function to a global window keydown event listener */
    useEffect(() => {
        window.addEventListener('keydown', prepareToTime);
    }, [])

    return (
        <h1 className="text_center" style={{ color: timeColor }}>{ calculateTime(ticks) }</h1>
    );
};

export default TimerExperiment;