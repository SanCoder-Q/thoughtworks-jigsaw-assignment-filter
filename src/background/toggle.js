let execute = require('./execute');
let filterCode = require('raw!uglify!babel!../content/filter');
let unfilterCode = require('raw!uglify!babel!../content/unfilter');
let toggle = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get(["core", "dedicated"], function(data) {
    if(data.core && data.dedicated) {
      toggle = !toggle;
      if(toggle) {
        execute(filterCode);
        chrome.browserAction.setIcon({path: "./resources/on.png"});
      } else {
        execute(unfilterCode);
        chrome.browserAction.setIcon({path: "./resources/off.png"});
      }
    }
  });
});
