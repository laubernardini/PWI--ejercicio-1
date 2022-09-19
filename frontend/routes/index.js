const router = require('express').Router();
const path = require('path');

const clientesRouter = require('./clientes.routes')
const productosRouter = require('./productos.routes')
const ventasRouter = require('./ventas.routes')
const proveedoresRouter = require('./proveedores.routes')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.use('/clients', clientesRouter)
router.use('/products', productosRouter)
router.use('/sales', ventasRouter)
router.use('/providers', proveedoresRouter)

module.exports = router;