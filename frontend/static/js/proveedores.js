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

function getProveedor() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/proveedores/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("nif").value = object.nif
        document.getElementById("direccion").value = object.direccion

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarProveedores() {
    let url = 'http://localhost:3000/proveedores';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let proveedores = document.getElementById('proveedores')

            let html = ''
            data.map(provider => {
                html += `
                    <tr id="${provider.id}">
                        <td>${provider.id}</td>
                        <td>${provider.nif}</td>
                        <td class="nombre">${provider.nombre}</td>
                        <td>${provider.direccion}</td>
                        <td>
                            <a type="button" href="/providers/update/${provider.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarProveedor('${provider.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            proveedores.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearProveedor() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/proveedores/create'
    const nombre = document.getElementById("nombre")
    const nif = document.getElementById("nif")
    const direccion = document.getElementById("direccion")
    const data = {
        'nombre': nombre.value,
        'nif': nif.value,
        'direccion': direccion.value,
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/providers"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarProveedor() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const proveedor_id = getIdFromUrl()
    const url = `http://localhost:3000/proveedores/update/${proveedor_id}`
    const nombre = document.getElementById("nombre")
    const nif = document.getElementById("nif")
    const direccion = document.getElementById("direccion")

    const data = {
        'nombre': nombre.value,
        'nif': nif.value,
        'direccion': direccion.value,
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/providers"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarProveedor(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText

    if (confirm(`¿Desea eliminar el proveedor "${nombre}"?`)) {
        const url = `http://localhost:3000/proveedores/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/providers"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}