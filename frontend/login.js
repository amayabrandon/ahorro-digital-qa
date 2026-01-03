const API_URL = 'http://localhost:5000/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    const submitButton = document.getElementById('loginButton');
    
    // Limpiar mensajes previos
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Obtener datos del formulario
    const formData = {
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
    };
    
    // Deshabilitar botón durante el envío
    submitButton.disabled = true;
    submitButton.textContent = 'Iniciando sesión...';
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            successDiv.textContent = `¡Bienvenido ${data.usuario.nombre}!`;
            successDiv.style.display = 'block';
            
            // Guardar datos en localStorage
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            
            // Redirigir después de 1 segundo
            setTimeout(() => {
                window.location.href = 'productos.html';
            }, 1000);
        } else {
            errorDiv.textContent = data.error || 'Error en el inicio de sesión';
            errorDiv.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Iniciar Sesión';
        }
    } catch (error) {
        errorDiv.textContent = 'Error de conexión con el servidor';
        errorDiv.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Iniciar Sesión';
    }
});
