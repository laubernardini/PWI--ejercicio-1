// Auxiliares

function disableButton(id) {
    const button = document.getElementById(id)
    button.className = button.className + " disabled"
    button.setAttribute('disabled', 'disabled')
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
}

function getIdFromUrl() {
    const route = new URL(window.location).pathname
    const pathArray = route.split('/')
    return pathArray[pathArray.length - 1]
}

// CRUD

function getVenta() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/ventas/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"
        loadSelect(cliente = object.clienteId, producto = object.productoId)
    })

}

function listarVentas() {
    let url = 'http://localhost:3000/ventas';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let ventas = document.getElementById('ventas')

            let html = ''
            console.log(data)
            data.map(item => {
                html += `
                    <tr id="${item.id}">
                        <td>${item.id}</td>
                        <td class="producto">${item.producto.nombre}</td>
                        <td class="cliente">${item.cliente.nombre} ${item.cliente.apellido} (${item.cliente.dni})</td>
                        <td>
                            <a type="button" href="/sales/update/${item.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarVenta('${item.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            ventas.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearVenta() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/ventas/create'
    const cliente = document.getElementById("cliente")
    const producto = document.getElementById("producto")

    const data = {
        'clienteId': cliente.value,
        'productoId': producto.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/sales"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarVenta() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const venta_id = getIdFromUrl()
    const url = `http://localhost:3000/ventas/update/${venta_id}`
    const clienteId = document.getElementById("clienteId")
    const productoId = document.getElementById("productoId")

    const data = {
        'clienteId': clienteId.value,
        'productoId': productoId.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/sales"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarVenta(id) {
    const item = document.getElementById(id)
    const producto = item.querySelector('.producto').innerText
    const cliente = item.querySelector('.cliente').innerText

    if (confirm(`¿Desea eliminar el venta "${producto} ${cliente}"?`)) {
        const url = `http://localhost:3000/ventas/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/sales"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}

// RELACIONES

function getClientes(clientes, cliente) {
    let url = 'http://localhost:3000/clientes';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let html = '<option value="null">Seleccionar</option>'
            data.map(item => {
                if (item.id == cliente) {
                    selected = 'selected'
                } else {
                    selected = ''
                }

                html += `<option value="${item.id}" ${selected}>${item.nombre} ${item.apellido} (${item.dni})</option>`
            })
            clientes.innerHTML = html
        });
}

function getProductos(productos, producto) {
    let url = 'http://localhost:3000/productos';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let html = '<option value="null">Seleccionar</option>'
            let selected = ''
            data.map(item => {
                if (item.id == producto) {
                    selected = 'selected'
                } else {
                    selected = ''
                }

                html += `<option value="${item.id}" ${selected}>${item.nombre}</option>`
            })
            productos.innerHTML = html
        });
}

function loadSelect(cliente = null, producto = null) {
    const clientes = document.getElementById("cliente")
    const productos = document.getElementById("producto")

    getClientes(clientes, cliente)
    getProductos(productos, producto)
}