var execute = executeWithDependencies(["./libs/jquery-3.1.0.min.js"]);
var toggle = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.sync.get(["core", "dedicated"], function(data) {
        if(data.core && data.dedicated) {
            toggle = !toggle;
            if(toggle) {
                execute("./js/filter.js");
                chrome.browserAction.setIcon({path: "./resources/on.png"});
            } else {
                execute("./js/unfilter.js");
                chrome.browserAction.setIcon({path: "./resources/off.png"});
            }
        }
    });
});
