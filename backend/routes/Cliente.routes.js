const router = require('express').Router()
const { Producto, Cliente } = require('../database/models')

router.get("/", (req, res) => {
    Cliente.findAll({
        attributes: ['dni', 'nombre'],
        include: {
            model: Producto,
            attributes: ['nombre', 'precio']
        }
    }).then(list => {
        res.json(list)
    })
})
router.post("/create", (req, res) => {
    Cliente.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
    }).then(cliente => {
        res.json(cliente)
    })
})

module.exports = router