const router = require('express').Router()
const { Producto, Proveedor } = require('../database/models')

router.get("/:id", (req, res) => {
    Producto.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Producto.findAll({
        attributes: ['id', 'nombre', 'precio'],
        include: [{
            model: Proveedor,
            as: 'proveedor',
            attributes: ["nombre", "nif"]
        }]
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Producto.create({
        precio: req.body.precio,
        nombre: req.body.nombre,
        proveedorId: req.body.proveedorId
    }).then(producto => {
        res.json(producto)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Producto.update({
        nombre: req.body.nombre,
        precio: req.body.precio,
        proveedorId: req.body.proveedorId
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