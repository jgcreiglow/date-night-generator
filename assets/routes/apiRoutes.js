const yelpSearch = require('./../../server.js');

module.exports = (app) => {
    let yelpSearchParams = {
        term: 'romantic restaurants',
        limit: '4',
        location: '',
        price: '',
        open_at: '',
    };
    app.post('/results/timeInfo', (req, res) => {
        // console.log(req.body)
        // setting Yelp API search params based on data
        yelpSearchParams.open_at = req.body.open_at;
        console.log(`this is the server open at time: ${yelpSearchParams.open_at}`);
        res.json(yelpSearchParams);
    });

    app.post('/results/priceInfo', (req, res) => {
        // console.log(req.body);
        // setting Yelp API search params based on data
        yelpSearchParams.location = req.body.location;
        yelpSearchParams.price = req.body.price;
        res.json(yelpSearchParams);
    });

    app.post('/results/data', (req, res) => {
        console.log("Correct Log", req.body);
        // setting Yelp API search params based on data
        yelpSearch.yelpSearch(req.body, (firstResult) => {
            res.json(firstResult);
        });
    });

    app.get("/results", (req, res) => {
        res.json(yelpSearchParams);
    });
}