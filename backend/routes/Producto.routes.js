const router = require('express').Router()
const { Producto, Cliente } = require('../database/models')

router.get("/:id", (req, res) => {
    Producto.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Producto.findAll({
        attributes: ['id', 'nombre', 'precio'],
        include: {
            model: Cliente,
            attributes: ['nombre', 'dni'],
        }
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Producto.create({
        precio: req.body.precio,
        nombre: req.body.nombre,
    }).then(producto => {
        res.json(producto)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    console.log(req.body)
    Producto.update({
        nombre: req.body.nombre,
        precio: req.body.precio
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
    Producto.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router;