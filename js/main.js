let listaProductos = [];

fetch('../products/products.json')
    .then(response => response.json())
    .then(data => {
        products = data.productos;
            products.forEach(product => {
                const {categoria,items} = product;
                listaProductos += `<div class="d-flex align-items-center flex-column text-primary greeting-container col-12 mt-3 mb-3"><h3>${categoria}</h3></div>`;
                items.forEach(item => {
                    const {id,nombre,precio,caracteristicas,modelo,origen,foto,alt} = item;
                    listaProductos += `<div class="card col-md-3 m-3" style="width: 18rem;" alt="${alt} id="${id}">
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
                        listaProductos += `<div class="card col-md-3 m-3" style="width: 18rem;" alt="${alt} id="${id}">
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
