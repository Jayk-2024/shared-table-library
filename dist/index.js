'use strict';

var React = require('react');

var Table = function (_a) {
    var data = _a.data, onActionClick = _a.onActionClick;
    return (React.createElement("table", null,
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "ID"),
                React.createElement("th", null, "Name"),
                React.createElement("th", null, "Value"),
                React.createElement("th", null, "Actions"))),
        React.createElement("tbody", null, data.map(function (item) { return (React.createElement("tr", { key: item.id },
            React.createElement("td", null, item.id),
            React.createElement("td", null, item.name),
            React.createElement("td", null,
                React.createElement("input", { type: "text", defaultValue: item.value, onBlur: function (e) { return onActionClick(item.id, e.target.value); } })),
            React.createElement("td", null,
                React.createElement("button", { onClick: function () { return onActionClick(item.id, 'edit'); } }, "Edit"),
                React.createElement("button", { onClick: function () { return onActionClick(item.id, 'delete'); } }, "Delete")))); }))));
};

exports.Table = Table;
