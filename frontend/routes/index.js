const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})
router.get('/products', (req, res) => {
    res.sendFile(path.resolve('./views/productos.html'));
})
router.get('/clients', (req, res) => {
    res.sendFile(path.resolve('./views/clientes.html'));
})

module.exports = router;