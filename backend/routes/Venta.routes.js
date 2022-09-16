const router = require('express').Router()
const { Producto, Cliente, Venta } = require('../database/models')

router.get("/:id", (req, res) => {
    Venta.findByPk(req.params.id, {}).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Venta.findAll({
        attributes: ["id"],
        include: [{
            model: Cliente,
            attributes: ["nombre", "apellido", "dni"]
        }, {
            model: Producto,
            attributes: ["nombre"]
        }]
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Venta.create({
        clienteId: req.body.clienteId,
        productoId: req.body.productoId,
    }).then(producto => {
        res.json(producto)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    console.log(req.body)
    Venta.update({
        clienteId: req.body.clienteId,
        productoId: req.body.productoId
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

router.delete('/delete/:id', (req, res) => {
    Venta.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router