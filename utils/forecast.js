const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=13966ae04693bc93a555bdeff38f42d6&query=' + latitude + ', ' + longitude
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try again!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' . It is currently ' + body.current.temperature + ' degrees out. It feels like '+ body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast