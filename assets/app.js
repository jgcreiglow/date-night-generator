// Our data object that will be sent via post request to the server to be used in our Yelp API search
let yelpSearchParams = {
    term: 'romantic restaurants',
    limit: '4',
    location: '',
    price: '',
    open_at: ''
};

let dateAndTime;
let dateAndTimeSetter = () => {
    if ($('#date').val() == "" && $('#start').val() == "") {
        let today = new Date();
        today = today.toISOString();
        today = today.split('T');
        today = today[0];
        let time = `24:00:00 UTC`
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
        yelpSearchParams.open_at = dateAndTime;
    } else if ($('#date').val() == "" && $('#start').val() != "") {
        let today = new Date();
        today = today.toISOString();
        today = today.split('T');
        today = today[0];
        let time = ($('#start').val());
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
        yelpSearchParams.open_at = dateAndTime;
    } else if ($('#date').val() != "" && $('#start').val() == "") {
        let today = ($('#date').val());
        let time = `24:00:00 UTC`
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
        yelpSearchParams.open_at = dateAndTime;
    } else if ($('#date').val() != "" && $('#start').val() != "") {
        let today = ($('#date').val());
        let time = ($('#start').val());
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
        yelpSearchParams.open_at = dateAndTime;
    }
}

// index page button listener, calls fuction that sets data object paramaters
$('#btnIndex').on("click", (event) => {
    event.preventDefault();
    dateAndTimeSetter();
    console.log(yelpSearchParams);
    $.ajax({
        url: "/results/timeInfo",
        method: 'POST',
        dataType: 'json',
        data: yelpSearchParams,
    }).done((data) => {
        console.log(`front end data ${data.open_at}`);
        console.log(data);
        window.location.href = './price'
    });

});

let dataQuery = (cb) => {
    let currentURL = window.location.origin;
    $.ajax({
            url: `${currentURL}/results`,
            method: "GET"
        })
        .then((data) => {
            yelpSearchParams.open_at = data.open_at;
            yelpSearchParams.location = data.location;
            yelpSearchParams.price = data.price;
            console.log(data);
            console.log(yelpSearchParams);
            cb(yelpSearchParams);
        });
}

let priceBuilder = () => {
    let priceArr = [];
    if ($('#1').prop('checked') == false && $('#2').prop('checked') == false && $('#3').prop('checked') == false && $('#4').prop('checked') == false) {
        let defaultPrice = `2,3`;
        yelpSearchParams.price = defaultPrice;
    } else {
        if ($('#1').is(':checked')) {
            priceArr.push(1);
        }
        if ($('#2').is(':checked')) {
            priceArr.push(2);
        }
        if ($('#3').is(':checked')) {
            priceArr.push(3);
        }
        if ($('#4').is(':checked')) {
            priceArr.push(4);
        }
        let priceHolder = priceArr.toString();
        yelpSearchParams.price = priceHolder;
    }
}

let zipcodeSetter = () => {
    let zipcode;
    if ($('#zipcode').val() == "") {
        zipcode = `20005`;
    } else zipcode = $('#zipcode').val();
    yelpSearchParams.location = zipcode;
}

$('#btnPrice').on("click", (event) => {
    event.preventDefault();
    priceBuilder();
    zipcodeSetter();
    console.log(yelpSearchParams);
    $.ajax({
        url: "/results/priceInfo",
        method: 'POST',
        dataType: 'json',
        data: yelpSearchParams,
    }).done((data) => {
        console.log(data);
        console.log(data.name);
        console.log(data.price);
        console.log(`This should be a unix value: ${data.open_at}`);
        window.location.href = './movies'
    });
});

$('#btnMovies').on("click", (event) => {
    event.preventDefault();
    dataQuery((data) => {
        console.log("front end check", data);
        $.ajax({
            url: "/results/data",
            method: 'POST',
            dataType: 'json',
            data: data,
        }).done((data) => {
            console.log(data);
            // let resultsData = data;
            // let restaurantDiv = $('<div>');
            // let restaurantSpan = $('<span>').html(`${data.name}`);
            // restaurantDiv.append(restaurantSpan);
            // $('#restaurantData').prepend(restaurantDiv);
            // window.location.href = './searchResults'
        });
    });
});
