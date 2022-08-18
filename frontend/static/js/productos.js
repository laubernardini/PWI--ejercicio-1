document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/productos')
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
})