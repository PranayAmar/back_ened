const {model} = require('mongoose');

const {OrdersSchema} = require('../schemas/Orders');

const OrdersModel = new model('orders',OrdersSchema);

module.exports = {OrdersModel};

