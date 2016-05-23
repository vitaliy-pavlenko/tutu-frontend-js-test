var TableSort = require('../src/js/tableSort');
var assert = require('chai').assert;

describe('tableSort tests', function () {

    var fakeTs;
    var fakeData = [
        {
            id: 1,
            firstName: 'abc',
            lastName: 'abc',
            email: 'abc@email.ru',
            phone: '9999'
        },
        {
            id: 7,
            firstName: 'wprbc',
            lastName: 'wprb',
            email: 'wpr@email.ru',
            phone: '2222'
        },
        {
            id: 4,
            firstName: 'zvc',
            lastName: 'zvc',
            email: 'zvc@email.ru',
            phone: '12312'
        }
    ];

    beforeEach(() => {
        fakeTs = new TableSort();
        document.body.innerHTML = '<div class="js-fake-ts"></div>';
        fakeTs.build('.js-fake-ts');
        fakeTs.setData(fakeData);
    });

    it("should render table body rows", () => {
        var rawsCount = document.getElementsByTagName('tbody')[0].children.length;
        assert.equal(rawsCount, fakeData.length, `Wrong render: expected ${fakeData.length} instead of ${rawsCount}`);
    });

    it("should filter data", () => {
        var searchStr = 'bc';
        assert.equal(fakeTs.search(searchStr).length, 2);
    });

});
