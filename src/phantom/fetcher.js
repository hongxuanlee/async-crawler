phantom.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
        });
    }
    console.log(msgStack.join('\n'));
}

var WebPage = require('webpage');
var system = require('system');
var fs = require('fs');

/**
 * to inject args to evaluate script
 */
var evaluate = function() {
    var args = Array.prototype.slice.call(arguments);
    var page = args[0];
    var arr = args.slice(1);
    return page.evaluate.apply(page, arr);
};

/**
 * open page
 */
var openPage = function(url, evaluateScript) {
    var page = WebPage.create();
    console.log('open page');
    page.onConsoleMessage = function (msg) {
        console.log(msg);
    };
    page.onError = function (msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('TRACE:');
            trace.forEach(function (t) {
                msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
            });
        }
       console.log(msgStack.join('\n'));
    };
    page.open(url, function (status){
        console.log(status);
        if (status !== 'success') {
            console.log('Fail to load this url');
        } else {
            console.log('page load finished');
            window.setTimeout(function () {
                console.log(1111);
                var data = evaluate(page, evaluateScript);
                phantom.exit(data);
            }, 1000);
        }
    });
    
};

if (system.args.length === 1) {
    console.log('parameter error!');
    phantom.exit(1);
}

var url = system.args[1];
var evaluatePath = system.args[2];
if (!url || !evaluatePath) {
    phantom.exit(1);
}

var evaluateScript = require(evaluatePath);

var Main = function Main() {
    // addCookie(cookieStr, url);
    openPage(url, evaluateScript);
};

Main();


