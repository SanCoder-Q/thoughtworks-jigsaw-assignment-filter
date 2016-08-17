function contains(arr, row) {
    var href = $(row).find(".name a").attr('href');
    return arr.find(_ => href && href.endsWith("/"+_));
}

var coreLable =
    "<span class='core-symbol' style='display: inline; float: right; font-size: .9em; padding: 0'>Ⓒ</span>";

(function ($) {
    chrome.storage.sync.get(["core", "dedicated"], function(data) {
        chrome.storage.sync.remove(["core", "dedicated"]);
        var table = $("table#assignment");
        table.find("tbody tr")
            .map((i, l) => {
                if (contains(data.core, l)) {
                    $(l).children(":first").append(coreLable);
                }
                return l;
            })
            .filter((i, l) => !contains(data.core.concat(data.dedicated), l))
            .each((i, l) => $(l).hide());
    });
})(jQuery);
