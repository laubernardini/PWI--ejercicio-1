function listarProductos() {
    let url = 'http://localhost:3000/productos';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let productos = document.getElementById('productos')

            let html = ''
            let clientText = ''
            data.map(product => {
                clientText = '<ul>'
                product.clientes.map(client => {
                    clientText += `<li>${client.nombre}, ${client.dni}</li>`
                })
                clientText += '</ul>'

                html += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.nombre}</td>
                        <td>$${product.precio}</td>
                        <td>${clientText}</td>
                    </tr>
                `
            })

            productos.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearProducto() {
    let url = 'http://localhost:3000/productos'

    let nombre = document.getElementById("nombre").value
    let precio = document.getElementById("precio").value

    let data = new URLSearchParams({
        'nombre': nombre,
        'precio': precio
    })

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(response => response.json()).then(data => {
        location.href = "/products"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })

}

function editarProducto() {

}