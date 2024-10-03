document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registerMessage = document.getElementById('registerMessage');

    fetch('../user/users.json')
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;
            const userExists = usuarios.some(user => user.email === email);

            if (userExists) {
                registerMessage.textContent = 'El email ya está registrado.';
            } else {
                const newUser = {
                    id: usuarios.length + 1,
                    nombre: nombre,
                    email: email,
                    password: password,
                    rol: 'comprador'
                };
                usuarios.push(newUser);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                registerMessage.textContent = 'Registro exitoso. Ahora puedes iniciar sesión.';
            }
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
});
