var dscount = require('../src/js/dscount');
var assert = require('chai').assert;

describe('dscount test', function () {
    var tests = [
        ['ab___ab__', 'a', 'b', 2],
        ['___cd____', 'c', 'd', 1],
        ['de_______', 'd', 'e', 1],
        ['12_12__12', '1', '2', 3],
        ['_ba______', 'a', 'b', 0],
        ['_a__b____', 'a', 'b', 0],
        ['-ab-аb-ab', 'a', 'b', 2]
    ];

    function runTest(i) {
        it(`Substring '${tests[i][1]}${tests[i][2]}' should enter(s) ${tests[i][3]} times in string '${tests[i][0]}'`, () => {
            assert.equal(dscount.apply(null, tests[i]), tests[i][3], `Error on ${i} test`);
        });
    }

    for (var i = 0; i < tests.length; i++) {
        runTest(i);
    }

});

