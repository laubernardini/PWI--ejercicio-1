const router = require('express').Router()
const { Producto, Cliente, ClienteProducto } = require('../database/models')

router.post("/create", (req, res) => {
    Cliente.findByPk(req.body.clienteDni).then(cliente => {
        Producto.findByPk(req.body.productoId).then(producto => {
            ClienteProducto.create({
                clienteDni: cliente.dni,
                productoId: producto.id,
            }).then(clienteProducto => {
                res.json(clienteProducto)
            })
        })
    })
})

module.exports = router