function contains(arr, str) {
    var lowerCaseStr = str.toLowerCase();
    return arr.find(_ => _.toLowerCase() === lowerCaseStr);
}

var coreLable =
    "<span class='core-symbol' style='display: inline; float: right; font-size: .9em; padding: 0'>Ⓒ</span>";

(function ($) {
    chrome.storage.sync.get(["core", "dedicated"], function(data) {
        chrome.storage.sync.clear();
        var table = $("table#assignment");
        table.find("tbody tr")
            .map((i, l) => {
                if (contains(data.core, $(l).find(".name a").text())) {
                    $(l).children(":first").append(coreLable);
                }
                return l;
            })
            .filter((i, l) => !contains(data.core.concat(data.dedicated), $(l).find(".name a").text()))
            .each((i, l) => $(l).hide());
    });
})(jQuery);
