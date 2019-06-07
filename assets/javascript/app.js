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
// create a variable equal to the text of the search input
    var gif = $(this).attr("data-name");
// create queryurl variable for ajax
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=6sd1wi2IPBy3XgJWTFEsPcQMhYxYrLQS&limit=10";
// ajax call to access giphy api library 
    $.ajax({
        url: queryURL,
        method: "GET"
    }) 
        .then(function (response) {
            
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // variable that will make a div to store the gif 
                var gifDiv = $("<div>");
                // variable that will equal the rating of the gif
                var rating = results[i].rating;
                // variable that generates a p tag with the text of the rating of the gif
                var p = $("<p>").text("Rating: " + rating);
                // variable that generates an img tag for the gifs, gives that variable an attribute that declares the "data-state" as still or animated for later on click function. assign the proper path for the still and animates states.
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-state", "still")
                gifImage.attr("data-animate", results[i].images.fixed_height.url)
                gifImage.attr("data-still", results[i].images.fixed_height_still.url)
                gifImage.addClass("gifImg");
                // prepend the variables p (rating info) and gitImage (gif) to gifDiv (div created earlier)
                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);
                // prepend that div to the div on the html with id #gifscont
                $("#gifscont").prepend(gifDiv);
            }
        })
}
// on click function that will take search input, push it into gifArray, and then render a button for each string in that array
$("#gifbutton").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    gifArray.push(gif)
    renderButtons();
});
// a click listener waiting for class .gifbutton to be clicked to then run displayGifs function 
$(document).on("click", ".gifbutton", displayGifs);

renderButtons();
// another click listener waiting for the class .gifImg to be clicked to then run a function that changes data-state from still to animated if data-state is still, and animated to still otherwise
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





