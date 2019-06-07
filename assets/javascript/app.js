// create an array to store premade buttons and user created buttons 
var gifArray = ["Beach", "Whale", "Shark", "Fish", "Squid",]
// create a button render function that will dynamically generate a button for every string in the array.  
function renderButtons() {
    $("#button-container").empty();
    for (var i = 0; i < gifArray.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gifbutton");
        newButton.attr("data-name", gifArray[i]);
        newButton.text(gifArray[i]);
        $("#button-container").append(newButton);
    }
}

// create a function that will display the gifs when a button is pressed 
function displayGifs() {
// define a variable equal to the attribute of a button, in this case, the actual text or search
    var gif = $(this).attr("data-name");
// 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=6sd1wi2IPBy3XgJWTFEsPcQMhYxYrLQS&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still")
                gifImage.attr("data-animate", results[i].images.fixed_height.url)
                gifImage.attr("data-still", results[i].images.fixed_height_still.url)
                gifImage.addClass("gifImg");

                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#gifscont").prepend(gifDiv);
                console.log(results)
            }
        })
}

$("#gifbutton").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifArray.push(gif)
    renderButtons();
});

$(document).on("click", ".gifbutton", displayGifs);

renderButtons();

$(document).on("click", ".gifImg", function (event) {
    var state = $(this).attr("data-state")
    // console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }

});





