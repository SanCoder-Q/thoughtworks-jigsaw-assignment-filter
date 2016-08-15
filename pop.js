function filter() {
    chrome.tabs.executeScript(null, {
        file: "content_script.js"
    });
}

document.getElementById('filter_btn').addEventListener('click', filter);


