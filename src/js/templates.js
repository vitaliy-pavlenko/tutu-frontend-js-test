module.exports = {

    tableTpl: function(data) {
        return `<table class="table">
            <thead>${this.theadTpl()}</thead>
            <tbody>${ data.map(this.tbodyTpl).join('') }</tbody>
        </table>`;
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
        return `<tr>
            <td>${data.id}</td>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
        </tr>`;
    }

};
