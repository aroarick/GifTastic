var buttonItems = ["Beastie Boys", "Madonna", "Duran Duran", "Gremlins", "Dirty Dancing", "ET", "The Golden Girls"];

$(document).ready(function () {
    $("#newTermButton").on("click", newTermButtonClick);
    $("#buttonContainer").on("click", searchTermButtonClick);
    init();
});

function init() {
    for (var i = 0; i < buttonItems.length; i++) {
        addNewSearchButton(buttonItems[i]);
    }
}

function newTermButtonClick() {
    var newTerm = $("#newTerm").val();
    addNewSearchButton(newTerm);
    buttonItems.push(newTerm);
    $("#newTerm").val("");
}

function addNewSearchButton(text) {
    var html = '<button class="btn btn-80s btn-lg search-term">' + text + '</button>';
    $("#buttonContainer").append(html);
}

function searchTermButtonClick(e) {
    if(e.target.tagName === "BUTTON"){
        console.log(e);
        var searchTerm = $(e.target).text();
        console.log(searchTerm);
    }
}