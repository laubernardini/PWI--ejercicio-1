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

function getProducto() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/productos/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("precio").value = object.precio

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarProductos() {
    let url = 'http://localhost:3000/productos';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let productos = document.getElementById('productos')

            let html = ''
            data.map(product => {
                html += `
                    <tr id="${product.id}">
                        <td>${product.id}</td>
                        <td class="nombre">${product.nombre}</td>
                        <td>$${product.precio}</td>
                        <td>
                            <a type="button" href="/products/update/${product.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarProducto('${product.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            productos.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearProducto() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/productos/create'
    const nombre = document.getElementById("nombre")
    const precio = document.getElementById("precio")

    const data = {
        'nombre': nombre.value,
        'precio': precio.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/products"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarProducto() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const producto_id = getIdFromUrl()
    const url = `http://localhost:3000/productos/update/${producto_id}`
    const nombre = document.getElementById("nombre")
    const precio = document.getElementById("precio")

    const data = {
        'nombre': nombre.value,
        'precio': precio.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/products"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarProducto(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText

    if (confirm(`¿Desea eliminar el producto "${nombre}"?`)) {
        const url = `http://localhost:3000/productos/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/products"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}