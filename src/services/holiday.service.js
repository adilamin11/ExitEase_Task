const axios = require("axios");
const config = require("../config/config");

const checkIfHoliday = async (date) => {
    try {
        const response = await axios.get("https://calendarific.com/api/v2/holidays", {
            params: {
                api_key: config.calendarific_api_key,
                country: "IN",
                year: date.year(),
                day: date.date(),
                month: date.month() + 1,
            },
        });
        console.log(response.data.response.holidays);
        const holidays = response.data.response.holidays;
        return holidays.length > 0; 
    } catch (error) {
        console.error("Error fetching holidays: ", error.message);
        return false; 
    }
};

module.exports = checkIfHoliday;