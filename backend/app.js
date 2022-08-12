const express = require('express')
const cors = require('cors')
const { Cliente, Producto, ClienteProducto } = require('./database/models')
const app = express()

const sequelize = require('./database/sequelize')
require('./database/associations')

const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/clientes", (req, res) => {
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
app.post("/clientes", (req, res) => {
    Cliente.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
    }).then(cliente => {
        res.json(cliente)
    })
})
app.get("/productos", (req, res) => {
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
app.post("/productos", (req, res) => {
    Producto.create({
        precio: req.body.precio,
        nombre: req.body.nombre,
    }).then(producto => {
        res.json(producto)
    })
})
app.post("/compras", (req, res) => {
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

app.listen(port, () => {
    console.log(`Server en puerto ${port}`)

    sequelize.sync({ force: false }).then(() => {
        console.log('Sincronizado')
    })
})