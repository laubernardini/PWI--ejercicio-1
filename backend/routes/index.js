const router = require('express').Router()
const clienteRouter = require('./Cliente.routes')
const productoRouter = require('./Producto.routes')
const ventaRouter = require('./Venta.routes')

router.use('/clientes', clienteRouter)
router.use('/productos', productoRouter)
router.use('/ventas', ventaRouter)

module.exports = router;