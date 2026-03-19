const {model} = require('mongoose');

const {PositionsSchema} = require('../schemas/Positions');

const PositionsModel = new model('positions',PositionsSchema);

module.exports = {PositionsModel};