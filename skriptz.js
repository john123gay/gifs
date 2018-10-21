var gifs = ["Tyson Fury", "Deontay Wilder", "Khabib", "Anthony Joshua"];

        function displayGif() {
            //api key
            var api = "NSdSctUpYh1lsksY0nTWvr7qHXNPaqC5";
            //the name of the picture from the gifs array
            var gif = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=NSdSctUpYh1lsksY0nTWvr7qHXNPaqC5&limit=10&q=" + gif;
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                // After the data from the AJAX request comes back
                .then(function (response) {
                      

                    // loop through 10 images, add a image url for 
                    //the default image, the still image and the active image
                   
                    for (var i = 0; i <= 10; i++) {
                        var imageUrl = response.data[i].images.fixed_width_still.url;
                        var stillUrl = response.data[i].images.fixed_width_still.url;
                        var activeUrl = response.data[i].images.fixed_width.url;
                        var rating = response.data[i].rating;
                        var title = response.data[i].title;
                        var score = response.data[i]._score;
                        // Creating and storing an image tag
                        var gifImage = $("<img>");

                        // Setting the gifImage src attribute to imageUrl
                        gifImage.attr("src", imageUrl);
                       //setting gifImage still image url, saving it to the data-still attribute
                        gifImage.attr("data-still", stillUrl);
                        //setting gifImage animated url, saving it to the data-animate attribute
                        gifImage.attr("data-animate", activeUrl);
                        //setting the default state to still
                        gifImage.attr("state", "still");
                        //if image link is broke display the text GIFZZZ
                        gifImage.attr("alt", "GIFZZZ");
                        //add the class gif to the <img> tags, this will be used to toggle the
                        //gif state attribute
                        gifImage.addClass("gif");
                       // gifImage.addClass("image-float");
                        //add gif to gif-view id, put the newest one first(prepend)
                       $("#gif-view").prepend('<span class="divski">'); 
                        $("#gif-view").prepend('<span class="cap-one"> Rated: ' + rating + "</span>");
                        $("#gif-view").prepend('<span class="cap-two"> Score: ' + score + "</span>");
                       
                        $("#gif-view").prepend(gifImage);
                        $("#gif-view").prepend("</span>");

                       
                        console.log(imageUrl);
                    }
                });
        }
        
        function renderButtons() {

            // Deleting the gifs prior to adding new movies

            $("#buttons-view").empty();

            // Loop through gifs
            for (var i = 0; i < gifs.length; i++) {

                //add the buttons 

                var a = $("<button>");
                // Adding a class of gif-btn to the button
                a.addClass("gif-btn");
                // Adding a data-attribute
                a.attr("data-name", gifs[i]);
                // Providing the initial button text
                a.text(gifs[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }
        //button event to add gif images to the #gif-view div
        $("#add-gif").on("click", function (event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var gif = $("#gif-input").val().trim();

            // Adding gif from textbox to array
            gifs.push(gif);

            // add the buttons from the array, initialize the functions
            renderButtons();
        });

      //if an element with the class .gif-btn is clicked run the displayGif function
        $(document).on("click", ".gif-btn", displayGif);

        renderButtons();
         //toggle between still state and animated state when the user clicks on the image
         //with the class .gif
        $(document).on("click", ".gif", function () {
            var state = $(this).attr("data-state");
             //change state from still to animated
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            //change state back to still from animated
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        }); 