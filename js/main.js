let listaProductos = '';
let products = [];

fetch('products/products.json') 
    .then(response => response.json())
    .then(data => {
        products = data.productos;
        products.forEach(product => {
            const { categoria, items } = product;
            listaProductos += `<div class="d-flex align-items-center flex-column text-primary greeting-container col-12 mt-3 mb-3"><h3>${categoria}</h3></div>`;
            items.forEach(item => {
                const { id, nombre, precio, caracteristicas, modelo, origen, foto, alt } = item;
                listaProductos += `<div class="card col-md-3 m-3" style="width: 18rem; cursor: pointer;" alt="${alt}" id="${id}" onclick="detalleProducto(${id},'${categoria}')">
                                        <img src="${foto}" class="card-img-top" alt="${alt}">
                                        <div class="card-body">
                                            <p class="card-title fw-bold">${nombre}</p>
                                            <p class="card-text">Modelo: ${modelo}</p>
                                            <p class="card-text">Origen: ${origen}</p>
                                            <p class="card-text">Precio: $${precio}</p>
                                            <p class="card-text">Características: ${caracteristicas}</p>
                                            <button class="btn btn-primary" onclick="addToCart(${id})">Comprar</button>
                                        </div>
                                    </div>`;
            });
        });

        document.getElementById("listaProductos").innerHTML = listaProductos;
    })
    .catch(error => console.error('Error al cargar los productos:', error));

const filtrarProductos = (filtro) => {
    let filteredProducts = '';
    fetch('../products/products.json') 
        .then(response => response.json())
        .then(data => {
            products = data.productos;
            products.forEach(product => {
                const { categoria, items } = product;
                if (categoria === filtro) {
                    filteredProducts += `<div class="d-flex align-items-center flex-column text-primary greeting-container col-12 mt-3 mb-3"><h3>${categoria}</h3></div>`;
                    items.forEach(item => {
                        const { id, nombre, precio, caracteristicas, modelo, origen, foto, alt } = item;
                        filteredProducts += `<div class="card col-md-3 m-3" style="width: 18rem; cursor: pointer;" alt="${alt}" id="${id}" onclick="detalleProducto(${id},'${categoria}')">
                                                <img src="${foto}" class="card-img-top" alt="${alt}">
                                                <div class="card-body">
                                                    <p class="card-title fw-bold">${nombre}</p>
                                                    <p class="card-text">Modelo: ${modelo}</p>
                                                    <p class="card-text">Origen: ${origen}</p>
                                                    <p class="card-text">Precio: $${precio}</p>
                                                    <p class="card-text">Características: ${caracteristicas}</p>
                                                    <button class="btn btn-primary" onclick="addToCart(${id})">Comprar</button>
                                                </div>
                                            </div>`;
                    });
                }
            });

            document.getElementById("listaProductos").innerHTML = filteredProducts;
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

const detalleProducto = (id, categoria) => {
    let filteredProducts = products.find(p => p.categoria === categoria);
    let product = filteredProducts.items.find(p => p.id === id);
    console.log(product);
    const { nombre, precio, caracteristicas, modelo, origen, descripcion, foto, alt } = product;
    listaProductos = `<div class="card mb-3" style="max-width: 1000px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${foto}" class="img-fluid rounded-start" alt="${alt}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${nombre}</h5>
                                    <p class="card-text"><strong>Precio:</strong> $${precio}</p>
                                    <p class="card-text"><strong>Modelo:</strong> ${modelo}</p>
                                    <p class="card-text"><strong>Origen:</strong> ${origen}</p>
                                    <p class="card-text"><strong>Descripción:</strong> ${descripcion}</p>
                                    <p class="card-text"><strong>Características:</strong> ${caracteristicas}</p>
                                    <button class="btn btn-primary" onclick="addToCart(${id})">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
    document.getElementById("listaProductos").innerHTML = listaProductos;
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.flatMap(category => category.items).find(item => item.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
}
