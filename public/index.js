const config = {
    headers: {
        "user-key": ''
    }
};

let lat = null;
let long = null;

Vue.component('form-comp', {
    template: `
        <div>
            <form class="review-form" @submit.prevent="onSubmit">
                <p>
                    <label for="distance">How far are you willing to go?</label>
                    <input id="distance" v-model="distance" required> Miles
                </p>
                <p>
                    <label for="cuisine">Whats on your mind?</label>
                    <input id="cuisine" v-model="cuisine" required>
                </p>
                <p>
                    <input type="submit" value="Submit">  
                </p>    
            </form>
        </div>
    `,
    data() {
        return {
            distance: null,
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
            app.restaurant_name = null;
            app.address = null;
            app.cuisines = null;
            app.searched = false;
            let dist = this.distance * 1609.34;
            axios
            .get('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=' + dist + '&q=' + this.cuisine + '&sort=rating', config)
            .then(response => {
                console.log('https://developers.zomato.com/api/v2.1/search?lat=' + lat + '&lon=' + long + '&radius=' + dist + '&q=' + this.cuisine + '&sort=rating');
                let rand = Math.floor(Math.random() * 20);
                console.log(response.data.restaurants[rand].restaurant);
                app.restaurant_name = response.data.restaurants[rand].restaurant.name;
                app.address = response.data.restaurants[rand].restaurant.location.address;
                app.cuisines = response.data.restaurants[rand].restaurant.cuisines;
                app.searched = true;
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
        restaurant_name: 'hello',
        address: null,
        cuisines: null,
        searched: false,
    }
})
