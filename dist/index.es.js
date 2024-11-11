import React from 'react';

var Table = function (_a) {
    var data = _a.data, onActionClick = _a.onActionClick;
    // Component implementation
    return (React.createElement("div", null, data.map(function (item) { return (React.createElement("div", { key: item.id },
        item.name,
        " - ",
        item.value,
        React.createElement("button", { onClick: function () { return onActionClick(item.id, 'edit'); } }, "Edit"),
        React.createElement("button", { onClick: function () { return onActionClick(item.id, 'delete'); } }, "Delete"))); })));
};

export { Table as default };
