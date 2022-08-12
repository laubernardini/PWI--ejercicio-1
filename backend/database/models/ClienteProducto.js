const { Model } = require('sequelize')
const sequelize = require('../sequelize')

class ClienteProducto extends Model {}

ClienteProducto.init({}, {
    sequelize,
    modelName: 'clienteProducto',
    tableName: 'clientesProductos'
})

module.exports = ClienteProducto