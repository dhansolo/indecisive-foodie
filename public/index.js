const config = {
    headers: {
        "user-key": '';
    }
};

let lat = null;
let long = null;

Vue.component('form-comp', {
    template: `
        <div>
            <form class="review-form" @submit.prevent="onSubmit">
                <p>
                    <label for="distance">Distance:</label>
                    <input id="distance" v-model="distance">
                </p>
                <p>
                    <label for="cuisine">Cuisine:</label>
                    <input id="cuisine" v-model="cuisine">
                </p>
                <p>
                    <input type="submit" value="Submit">  
                </p>    
            </form>
        </div>
    `,
    data() {
        return {
            distance: 5,
            cuisine: null,
        }
    },
    mounted () {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat, long);
        })
    },
    methods: {
        onSubmit() {
            console.log("button clicked");
            let dist = this.distance * 1609.34;
            axios
            .get('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=' + dist + '&sort=rating', config)
            .then(response => {
                // let rand = Math.floor(Math.random() * 20);
                // console.log(rand);
                // this.message = response.data.restaurants;
                // this.name = response.data.restaurants[rand].restaurant.name;
                // this.cuisine = response.data.restaurants[rand].restaurant.cuisines;
                // console.log(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })
            .finally( () => {
                console.log('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=' + dist + '&sort=rating')
            }) 
        }
    }
})

var app = new Vue({
    el: '#app',
})
