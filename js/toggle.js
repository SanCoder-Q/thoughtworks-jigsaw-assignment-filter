chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "config.html"});
});

var executeWithDependencies = function(dependencies){
    return function (jsfile) {
        if(dependencies) {
            dependencies
                .map(jsfile => chrome.tabs.executeScript.bind(null, null, {file: jsfile}))
                .reduceRight(
                    (acc, f) => f.bind(null, acc),
                    chrome.tabs.executeScript.bind(null, null, {file: jsfile})
                )();
        } else {
            chrome.tabs.executeScript(null, { file: jsfile});
        }
    };
};

var dependencies = [
    "./libs/jquery-3.1.0.min.js"
];

var execute = executeWithDependencies(dependencies);

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
    execute("./js/track.js");
});

