const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Producto extends Model {}

Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT
}, {
    sequelize,
    modelName: 'producto',
    tableName: 'productos'
})

module.exports = Producto