const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/7b54a8aa8d64c9f946a3c401e4351d57/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);

        }
        else if (body.error) {
            callback(response.body.error, undefined);
            // Unable to find location
        }
        else {

            data = body.currently
            data2 = body.daily.data[0]
            // console.log(data)
            callback(undefined, data2.summary + " It is currently " + data.temperature + " degrees out. The high today is " + data2.temperatureHigh + " with a low of " + data2.temperatureLow + ". There is " + data.precipProbability + "% chance of rain.")

        }
    }
    );
}

module.exports = forecast