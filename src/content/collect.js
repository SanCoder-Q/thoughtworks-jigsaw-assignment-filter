(function($) {
  let tabUrl = location.href;
  if(tabUrl.match(/jigsaw\.thoughtworks.+assignment/) && window._tu != tabUrl) {
    let elem = $(".user-menu .username");
    let username = elem && elem.text && elem.text().trim();
    let info = { name: username, url: tabUrl, title: document.title };
    chrome.storage.local.set({track: info});
    window._tu = tabUrl;
  }
})(window.$);
