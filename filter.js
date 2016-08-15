(function ($) {
    var table = $("table#assignment");
    var whiteList = ["Chen Sun", "Jianming Qu"];
    table.find("tbody tr")
        .filter((i, l) => !whiteList.includes($(l).find(".name a").text()))
        .each((i, l) => $(l).hide());
})(jQuery);
