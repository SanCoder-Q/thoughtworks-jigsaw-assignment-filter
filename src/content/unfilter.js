(function ($) {
    var table = $("table#assignment");
    table.find("tbody tr")
        .each((i, l) => {
            let row = $(l);
            row.show();
            row.find("span.core-symbol").remove();
        });
})(window.$);
