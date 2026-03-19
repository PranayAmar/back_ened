const {model} = require('mongoose');

const {HoldingSchema} = require('../schemas/Holdings');

const HoldingModel = new model('holding',HoldingSchema);

module.exports = {HoldingModel};