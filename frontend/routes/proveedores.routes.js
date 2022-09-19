const router = require('express').Router();
const path = require('path');

// Listar proveedores --> /providers
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/proveedores/listarProveedores.html'));
})

// Crear proveedor --> /providers/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/proveedores/crearProveedor.html'));
})

// Editar proveedor --> /providers/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/proveedores/editarProveedor.html'));
})

module.exports = router;