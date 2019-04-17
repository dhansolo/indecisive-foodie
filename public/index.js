const config = {
    headers: {
        "user-key": ''
    }
};

Vue.component('form-comp', {
    data() {
        return {
            distance: 5,
            lat: null,
            long: null,
            cuisine: null,
        }
    },
    template: `
        <div>
            Distance
            <input type="text" v-model="distance" required></input><br>
            Cuisine
            <input type="text" v-model="cuisine" required></input><br>
            <button>Find</button>
        </div>
    `,
    mounted () {
        let dist = this.distance * 1609.34;
        navigator.geolocation.getCurrentPosition(function(position) {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            axios
            .get('https://developers.zomato.com/api/v2.1/search?lat=' + this.lat + '&lon=' + this.long + '&radius=' + dist + '&sort=cost', config)
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
        })
    },
})

var app = new Vue({
    el: '#app',
})
