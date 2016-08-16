(function ($) {
    var table = $("table#assignment");
    table.find("tbody tr")
        .each((i, l) => {
            var row = $(l);
            row.show();
            row.find("span.core-symbol").remove();
        });
})(jQuery);
