const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Cliente extends Model {}

Cliente.init({
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    direccion: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE
}, {
    sequelize,
    modelName: 'cliente',
    tableName: 'clientes'
})

module.exports = Cliente