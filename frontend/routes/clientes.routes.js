const router = require('express').Router();
const path = require('path');

// Listar clientes --> /clients
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/listarclientes.html'));
})

// Crear cliente --> /clients/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/crearcliente.html'));
})

// Editar cliente --> /clients/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/clientes/editarcliente.html'));
})

module.exports = router;