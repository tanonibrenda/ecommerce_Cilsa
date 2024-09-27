document.getElementById('searchButton').addEventListener('click', function() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    fetch('../products/products.json')
      .then(response => response.json())
      .then(data => {
        const results = data.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
        displayResults(results);
      })
      .catch(error => console.error('Error:', error));
  });
  
  function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (results.length > 0) {
      results.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `<h3>${producto.nombre}</h3><p>${producto.descripcion}</p><p>Precio: $${producto.precio}</p>`;
        resultDiv.appendChild(productDiv);
      });
    } else {
      resultDiv.innerHTML = '<p>No se encontraron productos.</p>';
    }
  }
  