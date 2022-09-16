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

function getCliente() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/clientes/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("apellido").value = object.apellido
        document.getElementById("dni").value = object.dni
        document.getElementById("direccion").value = object.direccion
        document.getElementById("fechaNacimiento").value = object.fechaNacimiento

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarClientes() {
    let url = 'http://localhost:3000/clientes';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let clientes = document.getElementById('clientes')

            let html = ''
            data.map(client => {
                html += `
                    <tr id="${client.id}">
                        <td>${client.id}</td>
                        <td>${client.dni}</td>
                        <td class="nombre">${client.nombre}</td>
                        <td class="apellido">${client.apellido}</td>
                        <td>${client.direccion}</td>
                        <td>${client.fechaNacimiento}</td>
                        <td>
                            <a type="button" href="/clients/update/${client.id}" class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarCliente('${client.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            clientes.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearCliente() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/clientes/create'
    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const dni = document.getElementById("dni")
    const direccion = document.getElementById("direccion")
    const fechaNacimiento = document.getElementById("fechaNacimiento")

    const data = {
        'nombre': nombre.value,
        'apellido': apellido.value,
        'dni': dni.value,
        'direccion': direccion.value,
        'fechaNacimiento': fechaNacimiento.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/clients"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarCliente() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const cliente_id = getIdFromUrl()
    const url = `http://localhost:3000/clientes/update/${cliente_id}`
    const nombre = document.getElementById("nombre")
    const apellido = document.getElementById("apellido")
    const dni = document.getElementById("dni")
    const direccion = document.getElementById("direccion")
    const fechaNacimiento = document.getElementById("fechaNacimiento")

    const data = {
        'nombre': nombre.value,
        'apellido': apellido.value,
        'dni': dni.value,
        'direccion': direccion.value,
        'fechaNacimiento': fechaNacimiento.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/clients"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarCliente(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText
    const apellido = item.querySelector('.apellido').innerText

    if (confirm(`¿Desea eliminar el cliente "${nombre} ${apellido}"?`)) {
        const url = `http://localhost:3000/clientes/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/clients"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}