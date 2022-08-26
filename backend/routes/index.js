const router = require('express').Router()
const clienteRouter = require('./Cliente.routes')
const productoRouter = require('./Producto.routes')
const compraRouter = require('./Compra.routes')

router.use('/clientes', clienteRouter)
router.use('/productos', productoRouter)
router.use('/compras', compraRouter)

module.exports = router;