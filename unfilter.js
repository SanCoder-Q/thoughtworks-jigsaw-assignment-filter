(function ($) {
    var table = $("table#assignment");
    table.find("tbody tr")
        .each((i, l) => $(l).show());
})(jQuery);
