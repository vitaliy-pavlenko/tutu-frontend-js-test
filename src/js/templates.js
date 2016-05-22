module.exports = {

    tableTpl: function(data) {
        return `<table class="table js-table-sort">
            <thead>${this.theadTpl()}</thead>
            <tbody>${ data.map(this.tbodyTpl).join('') }</tbody>
        </table>
        <div class="table-sort__card"></div>`;
    },

    theadTpl: function() {
        return `<tr>
                <th data-sort-field="id">id</th>
                <th data-sort-field="firstName">firstName</th>
                <th data-sort-field="lastName">lastName</th>
                <th data-sort-field="email">email</th>
                <th data-sort-field="phone">phone</th>
            </tr>`;
    },

    tbodyTpl: function(data) {
        return `<tr data-id="${data.id}">
            <td>${data.id}</td>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
        </tr>`;
    },

    cardTpl: function(data) {
        return `<div class="panel panel-info">
            <div class="panel-heading">Выбран пользователь <b>${data.firstName} ${data.lastName}</b></div>
                <div class="panel-body">
                    Описание:<br><br>
                    <div class="well">${data.description}</div>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Адрес проживания: <b>${data.adress.streetAddress}</b></li>
                    <li class="list-group-item">Город: <b>${data.adress.city}</b></li>
                    <li class="list-group-item">Провинция/штат: <b>${data.adress.state}</b></li>
                    <li class="list-group-item">Индекс: <b>${data.adress.zip}</b></li>
                </ul>
            </div>`;
    }

};
