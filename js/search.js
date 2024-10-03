document.addEventListener('DOMContentLoaded', () => {
  fetch('../products/products.json')
    .then(response => response.json())
    .then(productData => {
      console.log('Productos cargados:', productData); 
      window.products = productData.productos; 
    })
    .catch(error => console.error('Error al cargar los productos:', error));
});

function searchProduct(event) {
  event.preventDefault(); 

  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; 

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
      productDiv.innerHTML = `<h3>${product.nombre}</h3><p>${product.descripcion}</p>`;
      resultsDiv.appendChild(productDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p>No se encontraron productos.</p>';
  }
}
