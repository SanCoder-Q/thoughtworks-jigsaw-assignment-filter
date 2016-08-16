(function ($) {
    chrome.storage.sync.get("whitelist", function(data) {
        chrome.storage.sync.clear();
        var table = $("table#assignment");
        table.find("tbody tr")
            .filter((i, l) => !data.whitelist.includes($(l).find(".name a").text()))
            .each((i, l) => $(l).hide());
    });
})(jQuery);
