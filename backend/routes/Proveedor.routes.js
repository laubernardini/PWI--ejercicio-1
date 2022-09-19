const router = require('express').Router()
const { Proveedor } = require('../database/models')

router.get("/:id", (req, res) => {
    Proveedor.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Proveedor.findAll({}).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Proveedor.create({
        nif: req.body.nif,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        fechaNacimiento: req.body.fechaNacimiento
    }).then(obj => {
        res.json(obj)
    })
})

router.put('/update/:id', (req, res) => {
    Proveedor.update({
        nif: req.body.nif,
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
    Proveedor.destroy({
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