import TableSort from './tableSort';
var ts = new TableSort();
const TABLE_CONTAINER = '.js-table-container';

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

    getData('http://www.filltext.com/?rows=50&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
        .then(json)
        .then(data => {
            ts.setData(data);
            buildPagination();
        });
}

function buildPagination() {
    var currentPage = 1;
    var li = '<li {{ active }}><a class="pagination__page" href="#" data-page="{{ page }}">{{ page }}</a></li>';
    var active = 'class="active"';
    var pagesCnt = 5;
    var pages = '';
    for (var i = 1; i <= pagesCnt; i++) {
        pages += li
            .replace(new RegExp('{{ page }}', 'g'), i.toString())
            .replace('{{ active }}', active);
        active = '';
    }
    var div = document.createElement('div');
    div.className = 'pagination-wrap';
    div.innerHTML = `<ul class="pagination">${pages}</ul>`;

    var table = document.querySelector(TABLE_CONTAINER);
    table.parentNode.insertBefore(div, table.nextSibling);

    var paginator = document.querySelector('.pagination');
    paginator.addEventListener('click', e => {
        e.preventDefault();
        var current = e.target.getAttribute('data-page');
        if (current == currentPage) return false;
        currentPage = current;
        [].forEach.call(
            paginator.children,
            el => el.classList.remove('active')
        );
        getData('http://www.filltext.com/?rows=50&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
            .then(json)
            .then(data => {
                ts.setData(data);
                e.target.parentNode.classList.add('active');
            });
    });
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

    ts.build(TABLE_CONTAINER);
});
