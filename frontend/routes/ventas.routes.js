const router = require('express').Router();
const path = require('path');

// Listar ventas --> /sales
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/listarVentas.html'));
})

// Crear venta --> /sales/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/crearVenta.html'));
})

// Editar venta --> /sales/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/ventas/editarVenta.html'));
})

module.exports = router;