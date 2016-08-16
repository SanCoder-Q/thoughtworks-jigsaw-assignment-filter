var executeWithDependencies = function(dependencies){
    return function (icon, jsfile) {
        if(dependencies) {
            dependencies
                .map(jsfile => chrome.tabs.executeScript.bind(null, null, {file: jsfile}))
                .reduceRight(
                    (acc, f) => function() { f.call(null, acc); },
                    () => {
                        chrome.tabs.executeScript(null, { file: jsfile});
                        chrome.browserAction.setIcon({path: icon});
                    }
                )();
        } else {
            chrome.tabs.executeScript(null, { file: jsfile});
        }
    }
};

var dependencies = [
    "./libs/jquery-3.1.0.min.js"
];

var execute = executeWithDependencies(dependencies);

var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
    var whitelist = localStorage["jigsaw-filter"];
    if(whitelist && whitelist.length > 0) {
        chrome.storage.sync.set({"whitelist": JSON.parse(whitelist)}, function() {
            toggle = !toggle;
            toggle ? execute("./resources/on.png", "./js/filter.js") : execute("./resources/off.png", "./js/unfilter.js");
        });
    }
});

