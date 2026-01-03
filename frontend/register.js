const API_URL = 'http://localhost:5000/api';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    const submitButton = document.getElementById('registerButton');
    
    // Limpiar mensajes previos
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        documento: document.getElementById('documento').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        captcha: document.getElementById('captcha').checked ? 'valid_captcha' : ''
    };
    
    // Validaciones en el frontend
    if (formData.password !== formData.confirmPassword) {
        errorDiv.textContent = 'Las contraseñas no coinciden';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (formData.password.length < 6) {
        errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorDiv.style.display = 'block';
        return;
    }
    
    if (!formData.captcha) {
        errorDiv.textContent = 'Debes marcar el captcha';
        errorDiv.style.display = 'block';
        return;
    }
    
    // Deshabilitar botón durante el envío
    submitButton.disabled = true;
    submitButton.textContent = 'Registrando...';
    
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            successDiv.textContent = 'Registro exitoso! Redirigiendo...';
            successDiv.style.display = 'block';
            
            // Limpiar formulario
            document.getElementById('registerForm').reset();
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            errorDiv.textContent = data.error || 'Error en el registro';
            errorDiv.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Registrarse';
        }
    } catch (error) {
        errorDiv.textContent = 'Error de conexión con el servidor';
        errorDiv.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Registrarse';
    }
});

// Habilitar/deshabilitar botón según captcha
document.getElementById('captcha').addEventListener('change', (e) => {
    const submitButton = document.getElementById('registerButton');
    submitButton.disabled = !e.target.checked;
});
