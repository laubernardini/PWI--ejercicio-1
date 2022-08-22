const router = require('express').Router();
const path = require('path');

const clientesRouter = require('./clientes.routes')
const productosRouter = require('./productos.routes')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.use('/clients', clientesRouter)
router.use('/products', productosRouter)

module.exports = router;