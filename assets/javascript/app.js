// object for api configurations
var apiConfig = {
    apiKey: "hdEIZ9OWKiC5QBl6cjaNByz72GrXMRec",
    url: "https://api.giphy.com/v1/gifs/search",
    limit: 10,
    offset: 0,
    rating: "g",
    lang: "en"
}

// puts comma in number 
const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0
})

// array of pre-made buttons 
var buttonItems = ["Beastie Boys", "Madonna", "Duran Duran", "Gremlins", "Dirty Dancing", "ET", "The Golden Girls"];

// when page is loaded buttons are loaded to be clicked
$(document).ready(function () {
    $("#newTermButton").on("click", newTermButtonClick);
    $("#buttonContainer").on("click", searchTermButtonClick);
    $("#gifHolder").on("click", gifClick);
    init();
});

// puts items in array into buttons
function init() {
    for (var i = 0; i < buttonItems.length; i++) {
        addNewSearchButton(buttonItems[i]);
    }
}

// a new term is added and can be clicked 
function newTermButtonClick() {
    var newTerm = $("#newTerm").val();
    addNewSearchButton(newTerm);
    buttonItems.push(newTerm);
    $("#newTerm").val("");
}

// if there is a word in the search bar it is added to the array
function addNewSearchButton(text) {
    if (text != "") {
        var html = '<button class="btn btn-80s btn-lg search-term">' + text + '</button>';
        $("#buttonContainer").append(html);
    }
}

// get gifs from giphy
function searchTermButtonClick(e) {
    if (e.target.tagName === "BUTTON") {
        console.log(e);
        var searchTerm = $(e.target).text().toLowerCase();
        console.log(searchTerm);

        $.get(apiConfig.url, {
                api_key: apiConfig.apiKey,
                q: searchTerm,
                limit: apiConfig.limit,
                offset: apiConfig.offset,
                rating: apiConfig.rating,
                lang: apiConfig.lang
            })
            .done(function (data) {
                console.log(data);
                addImagesToPage(data);
            });
    }
}

// add the gifs to the page
function addImagesToPage(data) {
    console.log(data);
    $("#gifHolder").empty();
    $("#info").empty();
    $("#info").text(data.pagination.count + " of " + formatter.format(data.pagination.total_count));
    for (var j = 0; j < data.data.length; j++) {
        var item = data.data[j];
        // console.log(item.rating);
        var p = $("<p>");
        p.text(data.data[j].rating);
        var p = $("<p>").text("Rating: " + data.data[j].rating);
        var stillImage = item.images['480w_still'].url;
        var movingImage = item.images.original.url;
        $("#gifHolder").append('<img data-still-src="' + stillImage + '" data-moving-src="' + movingImage + '" src="' + stillImage + '">');
    }
}

// function addRatingToPage() {
//     $("<p>").text("Rating: " + apiConfig.rating);
//     $("<div>").append(apiConfig.rating);
//     console.log(apiConfig.rating);
// } 

//when gif is clicked it moves then when clicked again it stops
function gifClick(e) {
    if (e.target.tagName === "IMG") {
        var src = $(e.target).attr("src");
        var stillSrc = $(e.target).attr("data-still-src");
        var movingSrc = $(e.target).attr("data-moving-src");
        if (src == stillSrc) {
            $(e.target).attr("src", movingSrc);
        } else {
            $(e.target).attr("src", stillSrc);
        }
    }
}