const padZero = (val) => {
    return val < 10 ? '0' + val.toString() : val.toString();
}

const calculateTime = (ticks) => {
    const mins = Math.floor(ticks / 6000);
    const secs = Math.floor(ticks / 100) - (mins * 60);
    const cs = ticks % 100;

    return padZero(mins) + ':' + padZero(secs) + '.' + padZero(cs);
}

export default calculateTime;