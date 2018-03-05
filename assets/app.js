let priceGetter = () => {
    $.get('/price/', () => {
        let foo = temp;
    });
}


//       if (jQuery.isEmptyObject(data)) {
//         $("#contribution-graph").text("Not a valid GitHub username");
//         state = false;
//       } else {
//         $("#contribution-graph").empty();
//         buildChords(data);
//       }
//     });