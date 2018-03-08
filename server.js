// Setting dependencies and configuring express and our ports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// setting up express to handle data
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('assets'));

// APIs
// Yelp
const yelp = require('yelp-fusion');
const apiKey = 'pXXnRa6C4iBeCevtqx0sY-fy-foonaKcKeRRLC9mjb2iDcyBAS8atAR2FDRzgYgewOFlqMoutS50Vwhgax964JKjJN7VwLYY9_GSsoEjiqxIwFskAP5hSQTJ2H-cWnYx';
const client = yelp.client(apiKey);


// Interacting with response object
// Restaurant name
// response.jsonBody.businesses[0].name
// Restaurant price
// response.jsonBody.businesses[0].price
// Category (Food type)
// response.jsonBody.businesses[0].categories[0].title
// Restaurant address
// response.jsonBody.businesses[0].location.address1
// response.jsonBody.businesses[0].location.city
// response.jsonBody.businesses[0].location.zip_code
// Restaurant Yelp link
// response.jsonBody.businesses[0].url

searchRequest = {
    term: 'romantic restaurants',
    location: '20011',
    price: '3, 4',
    limit: '4',
    open_at: ''
};

module.exports.yelpSearch = (data, callback) => client.search(data).then(response => {
    let firstResult = response.jsonBody.businesses[0];
    let secondResult = response.jsonBody.businesses[1];
    let thirdResult = response.jsonBody.businesses[2];
    let fourthResult = response.jsonBody.businesses[3];
    // console.log(firstResult);
    callback(firstResult);

}).catch(e => {
    console.log(e);
});

require("./assets/routes/apiRoutes")(app);
require("./assets/routes/htmlRoutes")(app);

// start server to listen
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

//The movie DB API Stuff

// let settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://api.themoviedb.org/3/movie/now_playing?page=1&language=en-US&api_key=b6922fe11ecf52925434dafab05830ce",
//     "method": "GET",
//     "headers": {},
//     "data": "{}",
// }
    
//     $.ajax(settings).done(function(response){
//         console.log(response);
// });




