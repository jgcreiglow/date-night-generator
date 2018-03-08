const path = require('path');
module.exports = (app) => {
    // routes
    // home, time entry phase
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../index.html"))
    });

    // price range phase
    app.get("/price", (req, res) => {
        res.sendFile(path.join(__dirname, "../price.html"))
    });

    // movie selection phase
    app.get("/movies", (req, res) => {
        res.sendFile(path.join(__dirname, "../movies.html"))
    });

    // results
    app.get("/searchResults", (req, res) => {
        res.sendFile(path.join(__dirname, "../results.html"))
    });
}