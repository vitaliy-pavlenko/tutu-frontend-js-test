import TableSort from './tableSort';
var ts = new TableSort();

function delegate(containers, selector, event, handler) {
    [].forEach.call(containers, (container) => {
        container.addEventListener(event, function (e) {
            if (e.target.matches(selector)) {
                handler.apply(e.target, arguments);
            }
        });
    });
}

function json(res) {
    return res.json();
}

function getData(resource) {
    return fetch(resource);
}

function smallDataHandler(e) {
    e.preventDefault();

    getData('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
        .then(json)
        .then(data => ts.setData(data));
}

function bigDataHandler(e) {
    e.preventDefault();

    getData('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
        .then(json)
        .then(data => ts.setData(data));
}

document.addEventListener('DOMContentLoaded', event => {
    delegate(
        document.querySelectorAll('.navbar'),
        '.js-small-data',
        'click',
        smallDataHandler
    );

    delegate(
        document.querySelectorAll('.navbar'),
        '.js-big-data',
        'click',
        bigDataHandler
    );

    ts.build('.js-table-container');
});
