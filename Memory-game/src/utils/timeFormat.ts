export const toHHMMSS = (numOfSec : number)=>{
    const seconds = numOfSec % 60;
    const minutes = Math.floor((numOfSec / 60) % 60);
    const hours = Math.floor((numOfSec / (60 * 60)) % 24);

    // console.log(seconds, minutes, hours);

    const secondsPrefix = seconds < 10 ? 0 : "";
    const minutesPrefix = minutes < 10 ? 0 : "";
    const hoursPrefix = hours < 10 ? 0 : "";

  return `${hoursPrefix}${hours}:${minutesPrefix}${minutes}:${secondsPrefix}${seconds}`;
};