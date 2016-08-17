function track() {
    chrome.storage.local.get(["track"], function(data) {
        var info = data.track;
        if(!info) return;
        if(!window.ga) {
            /* jshint ignore:start */
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            /* jshint ignore:end */
            ga('create', 'UA-58271438-2', 'auto');
            ga('set', 'checkProtocolTask', null);
            ga('set','userId', info.username);
            ga('send', 'pageview', info.url);
        } else {
            ga('send', 'event', 'action', 'clickEx');
        }
    });
}

function executeWithDependencies(dependencies) {
    return function (jsfile, callback) {
        if(dependencies) {
            dependencies
                .map(jsfile => chrome.tabs.executeScript.bind(null, null, {file: jsfile}))
                .reduceRight(
                    (acc, f) => f.bind(null, acc),
                    () => chrome.tabs.executeScript(null, {file: jsfile}, callback)
                )();
        } else {
            chrome.tabs.executeScript(null, {file: jsfile}, callback);
        }
    };
}

var dependencies = ["./libs/jquery-3.1.0.min.js"];
var execute = executeWithDependencies(["./libs/jquery-3.1.0.min.js"]);
var toggle = false;

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.storage.sync.get(["installed"], function(data) {
        if(!data.installed) {
            chrome.storage.sync.set({installed: true});
            chrome.tabs.create({url: "config.html"});
        }
    });
});

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
    execute("./js/track.js", track);
});
