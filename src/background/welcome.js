chrome.runtime.onInstalled.addListener(object => {
    chrome.storage.sync.get(["installed"], data => {
        if(!data.installed) {
            chrome.storage.sync.set({installed: true});
            chrome.tabs.create({url: "./config.html"});
        }
    });
});
