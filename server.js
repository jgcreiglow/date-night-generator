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

searchRequest = {
    term: 'romantic restaurants',
    location: '20011',
    price: '3, 4',
    limit: '4',
    open_at: ''
};

module.exports.yelpSearch = (data, callback) => client.search(data).then(response => {
    let yelpResults = response.jsonBody.businesses;
    callback(yelpResults);

}).catch(e => {
    console.log(e);
});

require("./assets/routes/apiRoutes")(app);
require("./assets/routes/htmlRoutes")(app);

// start server to listen
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});