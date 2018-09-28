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
            newButton.addClass('btn-dark');
            newButton.attr('data-name', gifArray[i]);
            newButton.text(gifArray[i]);
            $('#button-storage').append(newButton);

        }
    }
    function addImages(r) {
        $('#image-storage').empty();
        var newContainer = $('<div>');
        newContainer.addClass('container');
        $('#image-storage').append(newContainer);

        for (var i = 0; i < 10; i++) {

            if (isNewRow) {
                rowCount++;
                var newRow = $('<div>');
                newRow.addClass('row');
                newRow.addClass('rowNum-' + rowCount);
                newContainer.append(newRow);
                isNewRow = false;
            }

            pictureCount++;
            var newDiv = $('<div>');
            newDiv.addClass('col-md-3');
            newDiv.addClass('image-holder')
            var newP = $('<h5>');
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




            if (pictureCount >= 4) {
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
    function checkButtons(data) {
        var status = false;
        console.log(data);
        for (var i = 0; i < gifArray.length; i++) {
            if (data == gifArray[i]) {
                status = true;
                console.log(status);
                return status;
            }
        }
    }


    // $('.gif').on('click', function () {
    //     search = $(this).attr('data-name');
    //     callGiphyAjax();
    // })
    $(document).on('click', '.gif', function () {
        search = $(this).attr('data-name');
        $('.images-box').css('visibility', 'visible');
        callGiphyAjax();
    })

    $('#clear-gifs').on('click', function () {
        $('#image-storage').empty();
    })

    $('#add-gif').on('click', function (event) {
        event.preventDefault();
        var data = $('#git-input').val().trim();
        var isAlready = false;
        isAlready = checkButtons(data);
        if (isAlready) {
            $('#git-input').css('box-shadow', '0 0 6px red');
        }
        else {
            if (!data == "") {
                gifArray.push($('#git-input').val().trim());
                $('#button-storage').empty();
                showButtons();
            }

            else {
                $('#git-input').css('box-shadow', '0 0 6px red');
            }

        }

    })
    //so we can change the text border back to its original color
    $('#git-input').on('focus', function () {
        if (($(this).text()) == "") {
            $('#git-input').css('box-shadow', '0 0 6px rgba(35,173,255,1)');
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
