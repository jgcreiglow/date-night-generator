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

let yelpSearch = (callback) => client.search(searchRequest).then(response => {

    let firstResult = response.jsonBody.businesses[0];
    let secondResult = response.jsonBody.businesses[1];
    let thirdResult = response.jsonBody.businesses[2];
    let fourthResult = response.jsonBody.businesses[3];
    let testResult = response.jsonBody.businesses[0].location.address1;

    console.log(firstResult);
    callback(firstResult);

    // testing to make sure we get results, these will be replaced with serving the client these results on the results page
    //
    // console.log(JSON.stringify(firstResult, null, 4));
    // console.log(JSON.stringify(secondResult, null, 4));
    // console.log(JSON.stringify(thirdResult, null, 4));
    // console.log(JSON.stringify(fourthResult, null, 4));
    // console.log(JSON.stringify(testResult, null, 4));

}).catch(e => {
    console.log(e);
});

app.get('/restaurant/:dollarSigns?', (req, res) => {
    searchRequest.price = req.params.dollarSigns;
    yelpSearch((firstResult) => {
        console.log(firstResult);
        res.json(firstResult);
    });
})

// routes

// home, time entry phase
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/index.html"))
});

// price range phase
app.get("/price", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/price.html"))
});

// movie selection phase
app.get("/movie", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/movie.html"))
});

// results
app.get("/results", (req, res) => {
    res.sendFile(path.join(__dirname, "./assets/results.html"))
});

// default to home page if other route given
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./assets/index.html"));
// });

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




