const { Cliente, Producto, ClienteProducto } = require('./models')

Cliente.belongsToMany(Producto, { through: ClienteProducto, foreignKey: 'clienteDni' })
Producto.belongsToMany(Cliente, { through: ClienteProducto, foreignKey: 'productoId' })