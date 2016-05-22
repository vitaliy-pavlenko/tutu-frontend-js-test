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
        _store;

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
    };

    this.render = function() {
        _tbody.innerHTML = _store.map(raw => tpls.tbodyTpl(raw)).join('');
    };

    this.setData = function(data) {
        _store = data;
        _data = data;
        this.emit('update');
    };

}

module.exports = TableSort;
