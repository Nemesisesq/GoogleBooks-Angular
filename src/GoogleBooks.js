var GoogleBooks = {
    init: function () {
        var pageNumber = $('#pageNumber');

        $('#searchButton').click(GoogleBooks.search);
        $(document).on('click', '.book', function (e) {
            $(this).find(".dropdown").slideToggle("slow", "swing");
        });



        pageNumber.on('change', GoogleBooks.search);


        $('#prevPage').on('click', function () {
            if (parseInt(pageNumber.val()) > 1) {
                pageNumber.val(parseInt(pageNumber.val()) - 1);
                GoogleBooks.search();
            }
        });
        $('#nextPage').on('click', function () {

            pageNumber.val(parseInt(pageNumber.val()) + 1);
            GoogleBooks.search();

        });


    },
    search: function () {
        var searchText = $('#searchText').val();
        $('#searchResults').empty();
        $.ajax(
            {
                url: "https://www.googleapis.com/books/v1/volumes",
                data: {q: searchText, maxResults: 10, startIndex: ($('#pageNumber').val() - 1) * 10},
                success: function (data) {
                    $.each(data.items, function (n, item) {
                        var book = item.volumeInfo;
                        var resultId = 'result_' + n;
                        $('#searchResults').append(
                            "<div class='row book ' id='result'>" +
                            "<div class='col-md-6 lead'>" + book.title + "</div>" +
                            "<div class='col-md-6 pull-right'>" + book.authors.join() + "</div>" +
                            "<div class='col-md-6'>" + book.subtitle + "</div>" +
                            "<div class='col-md-6 pull-right'>" + book.publisher + "(" + book.publishedDate + ")</div>" +
                            "<div class='dropdown col-md-12'>" +
                            "<div class='col-md-3' >" +
                            "<img src=" + book.imageLinks.thumbnail + "></img>" +
                            //"<span  class='star clearfix rating-static' data-star='" + book.averageRating  + "'></span>" +
                            "<span class='clearfix' id='" + resultId + "'></span>" +
                            '</div>' +
                            "<div class='col-md-9'>" + book.description + "</div>" +
                            "</div>" +
                            "<div class='col-md-9 pull-right'>" + book.printType + "</div>" +
                            "<div class='col-md-9 pull-right'>" + book.pageCount + "</div>" +
                            "<div class='col-md-9 pull-right'>" + book.categories.join() + "</div>" +
                            "</div>" +
                            "<hr class=col-lg-12>"
                        );

                        $('#'+ resultId).raty({
                            readOnly: true,
                            start: book.averageRating
                        });

                        $('.dropdown').hide();
                    });
                }
            }
        )
    }
};