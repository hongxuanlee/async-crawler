const expect = require('chai').expect;
const fetcher = require('../src/index');
const path = require('path');

describe('fetch test', () => {
    it('should fetch dianping list', (done) => {
        var testUrl = 'http://www.dianping.com/search/category/3/10/r1983';
        var evaluatePath = path.join(__dirname, './fixture/listLength.js');
        fetcher(testUrl, evaluatePath, function(data){
            console.log('success', data);
            done();
        });
    });
})