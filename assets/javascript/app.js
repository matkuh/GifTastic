$("#gifbutton").on("click", function() {
    event.preventDefault();

var gif = $("#gif-input").val().trim();
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=6sd1wi2IPBy3XgJWTFEsPcQMhYxYrLQS&limit=5";
    

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {
var results = response.data

$("#gifscont").empty();

for (var i = 0; i < results.length; i++) {
    var gifDiv = $("<div>");

    var rating = results[i].rating;

    var p = $("<p>").text("Rating: " + rating);

    var personImage = $("<img>");
    personImage.attr("src", results[i].images.fixed_height.url);

    gifDiv.prepend(p);
    gifDiv.prepend(personImage);

    $("#gifscont").prepend(gifDiv);
}

})
})