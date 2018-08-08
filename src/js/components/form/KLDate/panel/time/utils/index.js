/* eslint-disable */
export const capitalize = str => str[0].toUpperCase() + str.slice(1);
export const mergeDateHMS = (date, hours, minutes, seconds) => {
    const newDate = new Date(date.getTime());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    return newDate;
};
export const unique = (el, i, arr) => arr.indexOf(el) === i;
export const returnFalse = () => false;
