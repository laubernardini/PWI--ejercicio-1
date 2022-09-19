const { Cliente, Producto, Venta, Proveedor } = require('./models')

Cliente.hasMany(Venta, { foreignKey: 'clienteId' })
Venta.belongsTo(Cliente, { foreignKey: 'productoId' })

Producto.hasMany(Venta, { foreignKey: 'productoId' })
Venta.belongsTo(Producto, { foreignKey: 'productoId' })

Proveedor.hasMany(Producto, { foreignKey: 'proveedorId' })
Producto.belongsTo(Proveedor, { foreignKey: 'proveedorId' })