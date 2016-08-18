chrome.runtime.onInstalled.addListener(function (object) {
    chrome.storage.sync.get(["installed"], function(data) {
        if(!data.installed) {
            chrome.storage.sync.set({installed: true});
            chrome.tabs.create({url: "config.html"});
        }
    });
});
