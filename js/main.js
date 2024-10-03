let listaProductos = [];
let products = [];

fetch('../../products/products.json')
    .then(response => response.json())
    .then(data => {
        products = data.productos;
            products.forEach(product => {
                const {categoria,items} = product;
                listaProductos += `<div class="d-flex align-items-center flex-column text-primary greeting-container col-12 mt-3 mb-3"><h3>${categoria}</h3></div>`;
                items.forEach(item => {
                    const {id,nombre,precio,caracteristicas,modelo,origen,foto,alt} = item;
                    listaProductos += `<div class="card col-md-3 m-3" style="width: 18rem; cursor: pointer;" alt="${alt} id="${id}" onclick="detalleProducto(${id},'${categoria}')">
                                            <img src="${foto}" class="card-img-top" alt="...">
                                            <div class="card-body">
                                            <p class="card-title fw-bold">${nombre}</p>
                                            <p class="card-text">Modelo: ${modelo}</p>
                                            <p class="card-text">Origen: ${origen}</p>
                                            <p class="card-text">Precio: $${precio}</p>
                                            <p class="card-text">Caracteristicas: ${caracteristicas}</p>
                                            </div>
                                        </div>`;
                });
            }) 
        

    document.getElementById("listaProductos").innerHTML = listaProductos;
});
    
const filtrarProductos = (filtro) => {
    let products = [];
    listaProductos = [];
    fetch('../products/products.json')
        .then(response => response.json())
        .then(data => {
            products = data.productos;
                products.forEach(product => {
                    const {categoria,items} = product;
                    if (categoria == filtro){listaProductos += `<div class="d-flex align-items-center flex-column text-primary greeting-container col-12 mt-3 mb-3"><h3>${categoria}</h3></div>`;}
                    items.forEach(item => {
                        if (categoria == filtro){
                            const {id,nombre,precio,caracteristicas,modelo,origen,foto,alt} = item;
                        listaProductos += `<div class="card col-md-3 m-3" style="width: 18rem; cursor: pointer;" alt="${alt} id="${id} onclick="detalleProducto(${id},'${categoria}')">
                                                <img src="${foto}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                <p class="card-title fw-bold">${nombre}</p>
                                                <p class="card-text">Modelo: ${modelo}</p>
                                                <p class="card-text">Origen: ${origen}</p>
                                                <p class="card-text">Precio: $${precio}</p>
                                                <p class="card-text">Caracteristicas: ${caracteristicas}</p>
                                                </div>
                                            </div>`;
                        }
                    });
                })
        document.getElementById("listaProductos").innerHTML = listaProductos;
    });
}

const detalleProducto = (id,categoria) => {
    let filteredProducts = products.find(p => p.categoria == categoria);
    let product = filteredProducts.items.find(p => p.id == id);
    console.log(product)
    const {nombre,precio,caracteristicas,modelo,origen,descripcion,foto,alt} = product;
    listaProductos = `<div class="card mb-3" style="max-width: 1000px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${foto}" class="img-fluid rounded-start" alt="${alt}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${nombre}</h5>
                                    <p class="card-text">Modelo: ${modelo}</p>
                                    <p class="card-text">Origen: ${origen}</p>
                                    <p class="card-text">Precio: $${precio}</p>
                                    <p class="card-text">Caracteristicas: ${caracteristicas}</p>
                                    <p class="card-text"><small class="text-body-secondary">Descripción: ${descripcion}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    document.getElementById("listaProductos").innerHTML = listaProductos;       
}