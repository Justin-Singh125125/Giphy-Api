$(document).ready(function () {
    var gifArray = ['dog', 'cat', 'rabbit', 'hamster'];
    var isNewRow = true;
    var pictureCount = 0;
    var rowCount = 0;




    showButtons();
    callGiphyAjax();

    function showButtons() {
        for (var i = 0; i < gifArray.length; i++) {
            var newButton = $('<button>');
            newButton.addClass('gif');
            newButton.attr('data-name', gifArray[i]);
            newButton.text(gifArray[i]);
            $('#button-storage').append(newButton);

        }
    }
    function addImages(r) {

        for (var i = 0; i < 10; i++) {

            if (isNewRow) {
                rowCount++;
                var newRow = $('<div>');
                newRow.addClass('row');
                newRow.addClass('rowNum-' + rowCount);
                $('#image-storage').append(newRow);
                isNewRow = false;
            }
            else {
                pictureCount++;
                var newDiv = $('<div>');
                newDiv.addClass('col-md-3');
                var newImg = $('<img>');
                newImg.attr('src', r.data[i].images.original_still.url);
                newDiv.append(newImg);
                $('.rowNum-' + rowCount).append(newDiv);
            }



            if (pictureCount >= 3) {
                isNewRow = true;
                pictureCount = 0;
            }




        }

    }
    function callGiphyAjax() {
        var limit = 20;
        var search = prompt('Enter a gif to search for');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=" + 20;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            addImages(response);
            console.log(response);

        })
    }

})
