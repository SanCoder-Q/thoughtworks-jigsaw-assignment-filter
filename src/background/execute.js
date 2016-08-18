function executeWithDependencies(dependencies) {
    return function (jscode, callback) {
        if(dependencies) {
            dependencies
                .map(jsfile => chrome.tabs.executeScript.bind(null, null, {file: jsfile}))
                .reduceRight(
                    (acc, f) => f.bind(null, acc),
                    () => chrome.tabs.executeScript(null, {code: jscode}, callback)
                )();
        } else {
            chrome.tabs.executeScript(null, {code: jscode}, callback);
        }
    };
}

module.exports = executeWithDependencies(["./vendor.js"]);
