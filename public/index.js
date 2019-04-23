const config = {
    headers: {
        "user-key": ""
    }
};

const map_key = "";
let lat = null;
let long = null;

Vue.component('form-comp', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p>
                <label value>How far are you willing to travel?</label><br>
                <input id="distance" v-model="distance" required placeholder="Distance in miles" type="number">
            </p>
            <p>
                <label value>What are you craving?</label><br>
                <input id="cuisine" v-model="cuisine" required placeholder="i.e. Asian, Greek, etc.">
            </p>
            <p>
                <input type="submit" value="Submit">  
            </p>    
        </form>
    `,
    data() {
        return {
            distance: null,
            cuisine: null,
        }
    },
    mounted () {
        // console.log(lat, long);
        axios
        .get('https://developers.zomato.com/api/v2.1/cities?lat=' + lat + '&lon=' + long, config)
        .then(response => {
            if(response.status == 200) {
                // console.log(response)
                app.location = response.data.location_suggestions[0].name + ", " + response.data.location_suggestions[0].country_name;
            }
        })
        .catch(error => {
            console.log(error)
        });
    },
    methods: {
        onSubmit() {
            app.restaurant_name = null;
            app.address = null;
            app.cuisines = null;
            app.link = null;
            app.map = null;
            app.results_found = false;
            app.results_not_found = false;
            let meters = this.distance * 1609.34; // Meters to Miles
            axios
            .get('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=' + meters + '&q=' + this.cuisine + '&sort=rating', config)
            .then(response => {
                let results_length = response.data.restaurants.length;
                if(results_length > 0) {
                    console.log(response);
                    let rand = Math.floor(Math.random() * response.data.restaurants.length);
                    let payload = response.data.restaurants[rand].restaurant;
                    // console.log(rand);
                    // console.log(response.data.restaurants[rand].restaurant);
                    app.restaurant_name = payload.name;
                    app.address = payload.location.address;
                    app.cuisines = payload.cuisines;
                    app.link = payload.url;
                    let restaurant_lat = payload.location.latitude;
                    let restaurant_long = payload.location.longitude;
                    let updated_rest_name = app.restaurant_name.replace(/[^a-zA-Z ]/g, "").split(' ').join('+');
                    app.map = "https://www.google.com/maps/embed/v1/search?key=" + map_key + "&q=" + updated_rest_name + "&center=" + restaurant_lat + "," + restaurant_long + "&maptype=roadmap&zoom=15";
                    app.results_found = true;
                } else {
                    app.results_not_found = true;
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        location: null,
        restaurant_name: null,
        address: null,
        cuisines: null,
        link: null,
        map: null,
        widget1: null,
        results_found: false,
        results_not_found : false,
        location_found: false
    },
    mounted () {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat, long);
            app.widget1 = "https://www.zomato.com/widgets/foodie_widget_img.php?widget_type=3&lat=" + lat + "&lon=" + long;
            app.location_found = true;
        }, function(err) {
            if(err.code == err.PERMISSION_DENIED) {
                console.log('please enable location services');
            }
        })
    }
})
