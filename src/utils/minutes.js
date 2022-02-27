const {
    format,
    formatDistance,
    formatRelative,
    subDays,
    differenceInMinutes,
    differenceInMilliseconds,
} = require("date-fns");
const getMilliseconds = function({ start, end }) {
    return new Promise((resolve) => {
        let startDate = new Date(start);
        let endDate = new Date(end);
        return resolve(differenceInMilliseconds(endDate, startDate));
    })
};
const getMinutes = function({ start, end }) {
    return new Promise((resolve) => {
        let startDate = new Date(start);
        let endDate = new Date(end);
        return resolve(differenceInMinutes(endDate, startDate));
    });
};
module.exports = {
    getMinutes,
    getMilliseconds,
};