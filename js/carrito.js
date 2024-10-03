document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; 
  
    if (cart.length > 0) {
      cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
          <h3>${product.nombre}</h3>
          <img src="${product.foto}" alt="${product.alt}" class="product-image">
          <p><strong>Precio:</strong> $${product.precio}</p>
          <p><strong>Modelo:</strong> ${product.modelo}</p>
          <p><strong>Origen:</strong> ${product.origen}</p>
          <p><strong>Descripción:</strong> ${product.descripcion}</p>
          <p><strong>Características:</strong> ${product.caracteristicas}</p>
          <button class="btn btn-danger" onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        cartDiv.appendChild(productDiv);
      });
    } else {
      cartDiv.innerHTML = '<p>El carrito está vacío.</p>';
    }
  });
  
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); 
  }
  
  function checkout() {
    alert('Compra finalizada');
    localStorage.removeItem('cart');
    location.reload(); 
  }
  