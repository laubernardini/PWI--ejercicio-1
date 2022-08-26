const express = require('express')
const cors = require('cors')
const { Cliente, Producto, ClienteProducto } = require('./database/models')
const app = express()

const sequelize = require('./database/sequelize')
const router = require('./routes')
require('./database/associations')

const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', router)

app.listen(port, () => {
    console.log(`Server en puerto ${port}`)

    sequelize.sync({ force: false }).then(() => {
        console.log('Sincronizado')
    })
})