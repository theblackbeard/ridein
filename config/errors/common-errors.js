'use strict';
const path = require('path');
exports.pageNotFound = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../..') + '/app/views/404.html');
};

exports.internalError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};