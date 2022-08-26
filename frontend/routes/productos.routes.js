const router = require('express').Router();
const path = require('path');

// Listar productos --> /products
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/productos/listarProductos.html'));
})

// Crear producto --> /products/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/productos/crearProducto.html'));
})

// Editar producto --> /products/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/productos/editarProducto.html'));
})

module.exports = router;