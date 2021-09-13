require("dotenv").config();
const postmanRequest = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=f`;

  postmanRequest({ url, json: true }, (error, { body }) => {
    const current = body.current;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
