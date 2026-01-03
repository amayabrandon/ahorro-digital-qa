const API_URL = 'http://localhost:5000/api';

let productos = [];

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
});

async function cargarProductos() {
    try {
        const response = await fetch(`${API_URL}/productos`);
        const data = await response.json();
        
        if (response.ok) {
            productos = data.productos;
            mostrarProductos();
            cargarSelectProductos();
        } else {
            console.error('Error al cargar productos');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        document.getElementById('productosContainer').innerHTML = 
            '<p style="text-align: center; color: #ef4444;">Error al cargar los productos. Verifica que el servidor esté ejecutándose.</p>';
    }
}

function mostrarProductos() {
    const container = document.getElementById('productosContainer');
    
    container.innerHTML = productos.map(producto => `
        <div class="product-card" data-testid="product-card-${producto.id}">
            <h3>${producto.nombre}</h3>
            <div class="tasa">${producto.tasa_interes}% EA</div>
            <p>${producto.descripcion}</p>
            <p class="monto-minimo">Monto mínimo: $${producto.monto_minimo.toLocaleString('es-CO')}</p>
        </div>
    `).join('');
}

function cargarSelectProductos() {
    const select = document.getElementById('producto');
    
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = `${producto.nombre} - ${producto.tasa_interes}% EA`;
        select.appendChild(option);
    });
}

// Simulador
document.getElementById('simulatorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const errorDiv = document.getElementById('simulatorError');
    const resultDiv = document.getElementById('simulatorResult');
    
    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';
    
    const formData = {
        producto_id: parseInt(document.getElementById('producto').value),
        monto: parseFloat(document.getElementById('monto').value),
        plazo_dias: parseInt(document.getElementById('plazo').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/simular`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarResultadoSimulacion(data);
        } else {
            errorDiv.textContent = data.error || 'Error en la simulación';
            errorDiv.style.display = 'block';
        }
    } catch (error) {
        errorDiv.textContent = 'Error de conexión con el servidor';
        errorDiv.style.display = 'block';
    }
});

function mostrarResultadoSimulacion(data) {
    document.getElementById('resultProducto').textContent = data.producto;
    document.getElementById('resultMontoInicial').textContent = 
        `$${data.monto_inicial.toLocaleString('es-CO')}`;
    document.getElementById('resultTasa').textContent = `${data.tasa_interes}% EA`;
    document.getElementById('resultPlazo').textContent = `${data.plazo_dias} días`;
    document.getElementById('resultGanancia').textContent = 
        `$${data.ganancia.toLocaleString('es-CO')}`;
    document.getElementById('resultMontoFinal').textContent = 
        `$${data.monto_final.toLocaleString('es-CO')}`;
    
    document.getElementById('simulatorResult').style.display = 'block';
    
    // Scroll suave al resultado
    document.getElementById('simulatorResult').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}
