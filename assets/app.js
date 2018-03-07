let priceState = false;
let priceArr = [];
let priceBuilder = () => {
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
}

let selectedPrice;

let priceGetter = (selectedPrice) => {
    $.get(`/restaurant/${selectedPrice}`, (data) => {
        console.log(data);
    });
}

$('#btnPrice').on("click", (event) => {
    event.preventDefault();
    if (!priceState) {
        priceBuilder();
        selectedPrice = priceArr.slice(',')
        priceGetter(selectedPrice);
        priceState = true;
    }
})
