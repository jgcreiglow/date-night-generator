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
        yelpSearchParams.open_at = req.body.open_at;
        res.json(yelpSearchParams);
    });

    app.post('/results/priceInfo', (req, res) => {
        yelpSearchParams.location = req.body.location;
        yelpSearchParams.price = req.body.price;
        res.json(yelpSearchParams);
    });

    app.post('/results/term', (req, res) => {
        yelpSearchParams.term = req.body.term;
        res.json(yelpSearchParams);
    });

    app.post('/results/data', (req, res) => {
        console.log("Correct Log", req.body);
        yelpSearch.yelpSearch(req.body, (yelpResults) => {
            res.json(yelpResults);
        });
    });

    app.get("/results", (req, res) => {
        res.json(yelpSearchParams);
    });
}