const { Cliente, Producto, Venta } = require('./models')

Cliente.hasMany(Venta, { foreignKey: 'clienteId' })
Venta.belongsTo(Cliente, { foreignKey: 'productoId' })


Producto.hasMany(Venta, { foreignKey: 'productoId' })
Venta.belongsTo(Producto, { foreignKey: 'productoId' })