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

// APIs
// Yelp
const yelp = require('yelp-fusion');
const apiKey = 'pXXnRa6C4iBeCevtqx0sY-fy-foonaKcKeRRLC9mjb2iDcyBAS8atAR2FDRzgYgewOFlqMoutS50Vwhgax964JKjJN7VwLYY9_GSsoEjiqxIwFskAP5hSQTJ2H-cWnYx';
const client = yelp.client(apiKey);

// we'll use javascript in our HTML file or a separate js file to modify these values like this:
// searchRequest.open_at = $("#date-time").val();
// searchRequest.location = $("#date-location").val();
// searchRequest.price = $("#date-price").val();
// module.exports = searchRequest;
// might need to export to interact with front-end

let searchRequest = {
    term: 'romantic restaurants',
    location: '20011',
    price: '3, 4',
    limit: '4',
    open_at: '',
    attributes: ''
};

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

// searching the API
client.search(searchRequest).then(response => {
    let firstResult = response.jsonBody.businesses[0];
    let secondResult = response.jsonBody.businesses[1];
    let thirdResult = response.jsonBody.businesses[2];
    let fourthResult = response.jsonBody.businesses[3];
    let testResult = response.jsonBody.businesses[0].location.address1;

    // testing to make sure we get results, these will be replaced with serving the client these results on the results page
    //
    console.log(JSON.stringify(firstResult, null, 4));
    console.log(JSON.stringify(secondResult, null, 4));
    console.log(JSON.stringify(thirdResult, null, 4));
    console.log(JSON.stringify(fourthResult, null, 4));
    console.log(JSON.stringify(testResult, null, 4));

}).catch(e => {
    console.log(e);
});

// routes

// home, time entry phase
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
});

// price range phase
app.get("/price", (req, res) => {
    res.sendFile(path.join(__dirname, "./price.html"))
});

// movie selection phase
app.get("/movie", (req, res) => {
    res.sendFile(path.join(__dirname, "./movie.html"))
});

// results
app.get("/results", (req, res) => {
    res.sendFile(path.join(__dirname, "./results.html"))
});

// default to home page if other route given
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
  });

// start server to listen
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});