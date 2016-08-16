var fs = require('fs'),
    archiver = require('archiver'),
    manifest = require("./manifest.json");

var isLocalBuild = process.env.TRAVIS_BRANCH === undefined;
var BUILD_VERSION = process.argv[2];
if (isLocalBuild) {
    pack();
} else {
    bump();
    pack();
}

function bump() {
    if (BUILD_VERSION) {
        var version = manifest.version.split('.');
        manifest.version = `${version[0]}.${version[1]}.${BUILD_VERSION}`;
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
    }
    console.log('Current Version: ' + manifest.version);
}

function pack() {
    console.log('Zipping ...');
    var checkDir = fs.existsSync('build') || fs.mkdirSync('build');
    var output = fs.createWriteStream('build/jigsaw-filter.zip');
    var archive = archiver('zip');
    output.on('close', function() {
        console.log(`Artifact: build/jigsaw-filter.zip(${archive.pointer()} bytes)`);
    });
    archive.on('error', function(err) {
        throw err;
    });
    archive.pipe(output);
    archive.glob('!(build|node_modules)*');
    archive.glob('!(build|node_modules)/**/*');
    archive.finalize();
}
