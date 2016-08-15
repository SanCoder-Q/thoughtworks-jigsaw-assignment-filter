var toggle = false;

var execute = function(icon, jsfile) {
    chrome.browserAction.setIcon({path: icon});
    chrome.tabs.executeScript.call(null, null, { file: "./libs/jquery-3.1.0.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: jsfile});
    });
};

chrome.browserAction.onClicked.addListener(function(tab) {
    toggle = !toggle;
    toggle ? execute("on.png", "filter.js") : execute("off.png", "unfilter.js");
});

