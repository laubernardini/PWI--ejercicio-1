const router = require('express').Router();
const path = require('path');

// Listar clientes --> /clients
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/listarClientes.html'));
})

// Crear cliente --> /clients/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/crearCliente.html'));
})

// Editar cliente --> /clients/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/editarCliente.html'));
})

module.exports = router;