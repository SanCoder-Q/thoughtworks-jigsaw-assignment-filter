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
