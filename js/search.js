document.addEventListener('DOMContentLoaded', () => {
  fetch('../products/products.json')
    .then(response => response.json())
    .then(productData => {
      console.log('Productos cargados:', productData); // Verifica los datos cargados
      window.products = productData.productos; // Guarda las categorías de productos en una variable global
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

function searchProduct(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Limpia los resultados anteriores

  if (!Array.isArray(window.products)) {
    console.error('window.products no es un array:', window.products);
    resultsDiv.innerHTML = '<p>Error al cargar los productos.</p>';
    return;
  }

  let filteredProducts = [];

  window.products.forEach(category => {
    const matchingItems = category.items.filter(product => 
      product.nombre.toLowerCase().includes(searchInput)
    );
    filteredProducts = filteredProducts.concat(matchingItems);
  });

  if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <h3>${product.nombre}</h3>
        <img src="${product.foto}" alt="${product.alt}" class="product-image">
        <p><strong>Precio:</strong> $${product.precio}</p>
        <p><strong>Modelo:</strong> ${product.modelo}</p>
        <p><strong>Origen:</strong> ${product.origen}</p>
        <p><strong>Descripción:</strong> ${product.descripcion}</p>
        <p><strong>Características:</strong> ${product.caracteristicas}</p>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">Comprar</button>
      `;
      resultsDiv.appendChild(productDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p>No se encontraron productos.</p>';
  }
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = window.products.flatMap(category => category.items).find(item => item.id === productId);
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Producto añadido al carrito');
}


