const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Proveedor extends Model {}

Proveedor.init({
    nif: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING
}, {
    sequelize,
    modelName: 'proveedor',
    tableName: 'proveedores'
})

module.exports = Proveedor