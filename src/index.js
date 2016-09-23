const path = require('path');

const child_process = require('child_process');
const spawn = child_process.spawn;

const phantomjs = require('phantomjs');
const binPath = phantomjs.path;

const PHANTOMJS_DIR = path.join(__dirname, 'phantom');
const PHANTOMJS_FILE = path.join(PHANTOMJS_DIR, 'fetcher.js');
console.log(PHANTOMJS_FILE);
let getConetnt = function(url, evaluatePath, cb) {
    let proc = spawn(binPath, [PHANTOMJS_FILE, url, evaluatePath], {
        stdio: "inherit"
    });
    proc.on('exit', (data) => {
        cb && cb(data);
    });
};

module.exports = getConetnt;