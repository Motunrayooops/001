const request = require('request')

const geocode = async (address, callback) => {
    // const url = 'https://api.mapbox.com/search/geocode/v6/forward?country=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibW90dW5yYXlvMDEiLCJhIjoiY20yOWMwNTJkMDQxZjJpcHpkc3hjcXQ5aiJ9.KRL5aral1RM13AZhejtADg&limit=1'

    // const url = 'https://api.mapbox.com/search/geocode/v6/' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibW90dW5yYXlvMDEiLCJhIjoiY20yOWMwNTJkMDQxZjJpcHpkc3hjcXQ5aiJ9.KRL5aral1RM13AZhejtADg&limit=1'

    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoibW90dW5yYXlvMDEiLCJhIjoiY20yOWMwNTJkMDQxZjJpcHpkc3hjcXQ5aiJ9.KRL5aral1RM13AZhejtADg&limit=1`
    await request ({ url, json: true}, (error, { body }) => {
        // console.log('body:', response.body)

        // const { body } = response
        // const body = response.body

        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again.')
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.place_formatted
            })
        }
    })
}

module.exports = geocode