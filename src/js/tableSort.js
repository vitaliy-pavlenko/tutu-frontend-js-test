var tpls = require('./templates');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

inherits(TableSort, EventEmitter);

function TableSort() {

    var _data = [],
        _container,
        _table,
        _thead,
        _tbody,
        _store,
        _currentField;

    this.build = function(container) {
        _container = document.querySelector(container);
        _container.innerHTML = tpls.tableTpl(_data);
        this.init();
    };

    this.getData = function() {
        return _data;
    };

    this.init = function() {
        _table = _container.querySelector('table');
        _thead = _table.querySelector('thead');
        _tbody = _table.querySelector('tbody');
        this.on('update', this.render);
        this.events();
    };

    this.render = function() {
        _tbody.innerHTML = _store.map(raw => tpls.tbodyTpl(raw)).join('');
    };

    this.setData = function(data) {
        _store = data;
        _data = data;
        this.emit('update');
    };

    this.events = function() {
        _thead.addEventListener('click', this.sort.bind(this));
    };

    this.sort = function(e) {
        if (e.target.tagName != 'TH') return;
        var sortField = e.target.getAttribute('data-sort-field');

        if (_currentField === sortField) {
            _store = _store.reverse();
            e.target.setAttribute('data-sort-dir', e.target.getAttribute('data-sort-dir') == 'ASC' ? 'DESC' : 'ASC');
        } else {

            [].forEach.call(
                _thead.querySelectorAll('th'),
                row => {
                    row.classList.remove('table-sort__sorted');
            });

            _store = _store.sort((a, b) => {
                return a[sortField] > b[sortField] ? 1 : -1;
            });

            _currentField = sortField;

            e.target.classList.add('table-sort__sorted');
            e.target.setAttribute('data-sort-dir', 'ASC');
        }

        this.emit('update');
    }

}

module.exports = TableSort;
