var config = {
    headers: {
        "Authorization": "Bearer PkpLDGnr2eCWKEDtyw2g1IbMEFHk4hVRMfuMm5-1OVnIkYNdTAG43PDxHCtKPLH1UwcV7E6wVrF_oUB3BGVTPTjLtRWKX_oq3b6VsgqcCCxQfiCKf08XQ6Jsgd6yXHYx",
        "cache-control": "no-cache",
    }
};

var app = new Vue({
    el: '#app',
    data: {
        message: "hello????"
    },
    mounted () {
        axios
        // .request({
        //     method: 'get',
        //     // url: 'https://api.yelp.com/v3/businesses/search?term=asian&location=98037&limit=1',
        //     url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.6062,-122.3321&radius=1500&type=restaurant&key=AIzaSyAlqpubmmH-DgWoxO7-DIvGOngCH5AomoQ',
        //     headers: {
        //         // 'Authorization': 'Bearer PkpLDGnr2eCWKEDtyw2g1IbMEFHk4hVRMfuMm5-1OVnIkYNdTAG43PDxHCtKPLH1UwcV7E6wVrF_oUB3BGVTPTjLtRWKX_oq3b6VsgqcCCxQfiCKf08XQ6Jsgd6yXHYx',
        //         'Access-Control-Allow-Origin':  'http://localhost:8000/',
        //         'Access-Control-Allow-Methods': 'GET',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        // })
        .get('https://api.yelp.com/v3/businesses/search?term=asian&location=98037&limit=1', config)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            console.log(config);
        })
    }
})