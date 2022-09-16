const { Model } = require('sequelize')
const sequelize = require('../sequelize')

class Venta extends Model {}

Venta.init({}, {
    sequelize,
    modelName: 'venta',
    tableName: 'ventas'
})

module.exports = Venta