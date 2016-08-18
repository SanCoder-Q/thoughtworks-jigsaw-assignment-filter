var tabUrl = location.href;
if(tabUrl.match(/jigsaw\.thoughtworks.+assignment/) && window._tu != tabUrl) {
    var elem = $(".user-menu .username");
    var username = elem && elem.text && elem.text().trim();
    var info = { name: username, url: tabUrl };
    chrome.storage.local.set({track: info});
    window._tu = tabUrl;
}
