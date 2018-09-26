$(document).ready(function () {
    var gifArray = ['dog', 'cat', 'rabbit', 'hamster'];
    var isNewRow = true;
    var pictureCount = 0;
    var rowCount = 0;
    var limit = 20;
    var search = "";





    showButtons();

    function showButtons() {
        for (var i = 0; i < gifArray.length; i++) {
            var newButton = $('<button>');
            newButton.addClass('gif');
            newButton.addClass('btn-info');
            newButton.attr('data-name', gifArray[i]);
            newButton.text(gifArray[i]);
            $('#button-storage').append(newButton);

        }
    }
    function addImages(r) {
        $('#image-storage').empty();

        for (var i = 0; i < 10; i++) {

            if (isNewRow) {
                rowCount++;
                var newRow = $('<div>');
                newRow.addClass('row');
                newRow.addClass('rowNum-' + rowCount);
                $('#image-storage').append(newRow);
                isNewRow = false;
            }

            pictureCount++;
            var newDiv = $('<div>');
            newDiv.addClass('col-md-3');
            var newP = $('<h3>');
            newP.addClass('rating');
            newP.text('Rating: ' + r.data[i].rating);
            newDiv.append(newP);
            var newImg = $('<img>');
            newImg.addClass('gif-alternate');
            newImg.attr('src', r.data[i].images.original_still.url);
            newImg.attr('data-value', 'still');
            newImg.attr('src-still', r.data[i].images.original_still.url);
            newImg.attr('src-move', r.data[i].images.original.url);
            newDiv.append(newImg);
            $('.rowNum-' + rowCount).append(newDiv);




            if (pictureCount >= 3) {
                isNewRow = true;
                pictureCount = 0;
            }




        }

    }
    function callGiphyAjax() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=" + 10;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            addImages(response);
            console.log(response);
            console.log('test');
        })
    }


    // $('.gif').on('click', function () {
    //     search = $(this).attr('data-name');
    //     callGiphyAjax();
    // })
    $(document).on('click', '.gif', function () {
        search = $(this).attr('data-name');
        callGiphyAjax();
    })

    $('#clear-gifs').on('click', function () {
        $('#image-storage').empty();
    })

    $('#add-gif').on('click', function (event) {
        event.preventDefault();
        var data = $('#git-input').val().trim();
        if (!data == "") {
            gifArray.push($('#git-input').val().trim());
            $('#button-storage').empty();
            showButtons();
        }

    })


    $(document).on('click', '.gif-alternate', function () {
        if ($(this).attr('data-value') == 'still') {
            //change the source to the movable
            $(this).attr('src', $(this).attr('src-move'));
            $(this).attr('data-value', 'move');
        }
        else {
            $(this).attr('src', $(this).attr('src-still'));
            $(this).attr('data-value', 'still');

        }
    })
})
