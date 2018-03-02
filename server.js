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


// routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

// start server to listen
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});