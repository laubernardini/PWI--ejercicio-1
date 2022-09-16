const router = require('express').Router()
const { Producto, Cliente } = require('../database/models')

router.get("/:id", (req, res) => {
    Cliente.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Cliente.findAll({}).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Cliente.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        fechaNacimiento: req.body.fechaNacimiento
    }).then(cliente => {
        res.json(cliente)
    })
})

router.put('/update/:id', (req, res) => {
    Cliente.update({
        dni: req.body.dni,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        fechaNacimiento: req.body.fechaNacimiento
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
    Cliente.destroy({
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