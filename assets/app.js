// Our data object that will be sent via post request to the server to be used in our Yelp API search
let yelpSearchParams = {
    location: '',
    price: '',
    open_at: '',
    attributes: ''
};

let dateAndTime;
let dateAndTimeSetter = () => {
    if ($('#date').val() == "" && $('#start').val() == "") {
        let today = new Date();
        today = today.toISOString();
        today = today.split('T');
        today = today[0];
        let time = `12:00:00 UTC`
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
    } else if ($('#date').val() == "" && $('#start').val() != "") {
        let today = new Date();
        today = today.toISOString();
        today = today.split('T');
        today = today[0];
        let time = ($('#start').val());
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
    } else if ($('#date').val() != "" && $('#start').val() == "") {
        let today = ($('#date').val());
        let time = `12:00:00 UTC`
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
    } else if ($('#date').val() != "" && $('#start').val() != "") {
        let today = ($('#date').val());
        let time = ($('#start').val());
        let finalTime = Date.parse(`${today} ${time}`);
        dateAndTime = finalTime / 1000 | 0;
    }
    yelpSearchParams.open_at = dateAndTime;
}

// index page button listener, calls fuction that sets data object paramaters
$('#btnIndex').on("click", (event) => {
    // event.preventDefault();
    dateAndTimeSetter();
    console.log(yelpSearchParams.open_at)
});

let priceBuilder = () => {
    let priceArr = [];
    if ($('#1').prop('checked') == false && $('#2').prop('checked') == false && $('#3').prop('checked') == false && $('#4').prop('checked') == false) {
        let defaultPrice = [2, 3];
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
        let priceHolder = priceArr.slice(',');
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
    // event.preventDefault();
    priceBuilder();
    zipcodeSetter();
    console.log(yelpSearchParams.location);
    console.log(yelpSearchParams.price);
});


// Original routing attempt
// let priceSetter = (selectedPrice) => {
//     $.get(`/restaurant/${selectedPrice}`, (data) => {
//         console.log(data);
//         console.log(`Restaurant: ${data.name}
// Price: ${data.price}
// Category: ${data.categories[0].title}
// Address:
// ${data.location.address1}
// ${data.location.city}
// ${data.location.zip_code}
// Yelp Link: ${data.url}`);
//     });
// }

// let dateSetter = (selectedDate) => {
//     $.get(`/restaurant/${selectedDate}`, (data) => {
//         console.log(data);
//     })
// }

// let zipcodeSetter = (selectedZipcode) => {
//     $.get(`/restaurant/${selectedZipcode}`, (data) => {
//         console.log(data);
//     });
// }