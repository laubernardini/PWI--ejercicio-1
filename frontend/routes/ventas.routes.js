const router = require('express').Router();
const path = require('path');

// Listar ventas --> /sales
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/listarventas.html'));
})

// Crear venta --> /sales/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/crearventa.html'));
})

// Editar venta --> /sales/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/editarventa.html'));
})

module.exports = router;