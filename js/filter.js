function contains(arr, str) {
    var lowerCaseStr = str.toLowerCase();
    return arr.find(_ => _.toLowerCase() === lowerCaseStr);
}

(function ($) {
    chrome.storage.sync.get("whitelist", function(data) {
        chrome.storage.sync.clear();
        var table = $("table#assignment");
        table.find("tbody tr")
            .filter((i, l) => !contains(data.whitelist, $(l).find(".name a").text()))
            .each((i, l) => $(l).hide());
    });
})(jQuery);
