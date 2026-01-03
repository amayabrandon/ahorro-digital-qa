from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Base de datos simulada en memoria
usuarios = {}
productos = [
    {
        "id": 1,
        "nombre": "Cuenta de Ahorros Tradicional",
        "tasa_interes": 0.5,
        "monto_minimo": 50000,
        "descripcion": "Cuenta de ahorros con tasa de interés fija del 0.5% anual"
    },
    {
        "id": 2,
        "nombre": "Cuenta de Ahorros Premium",
        "tasa_interes": 1.2,
        "monto_minimo": 500000,
        "descripcion": "Cuenta de ahorros Premium con tasa del 1.2% anual"
    },
    {
        "id": 3,
        "nombre": "CDT 90 días",
        "tasa_interes": 3.5,
        "monto_minimo": 1000000,
        "descripcion": "Certificado de Depósito a Término a 90 días con tasa del 3.5% EA"
    },
    {
        "id": 4,
        "nombre": "CDT 180 días",
        "tasa_interes": 4.2,
        "monto_minimo": 1000000,
        "descripcion": "Certificado de Depósito a Término a 180 días con tasa del 4.2% EA"
    }
]

@app.route('/health', methods=['GET'])
def health():
    """Endpoint de salud"""
    return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()}), 200

@app.route('/api/register', methods=['POST'])
def register():
    """Registro de nuevo usuario"""
    data = request.get_json()
    
    # Validaciones
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    
    email = data.get('email', '').strip()
    password = data.get('password', '')
    nombre = data.get('nombre', '').strip()
    documento = data.get('documento', '').strip()
    telefono = data.get('telefono', '').strip()
    captcha = data.get('captcha', '')
    
    # Validar campos obligatorios
    if not email:
        return jsonify({"error": "El email es obligatorio"}), 400
    if not password:
        return jsonify({"error": "La contraseña es obligatoria"}), 400
    if not nombre:
        return jsonify({"error": "El nombre es obligatorio"}), 400
    if not documento:
        return jsonify({"error": "El documento es obligatorio"}), 400
    if not captcha:
        return jsonify({"error": "El captcha es obligatorio"}), 400
    
    # Validar formato de email
    if '@' not in email:
        return jsonify({"error": "Email inválido"}), 400
    
    # Validar captcha (simulación simple)
    if captcha != "valid_captcha":
        return jsonify({"error": "Captcha inválido"}), 400
    
    # Verificar si el usuario ya existe
    if email in usuarios:
        return jsonify({"error": "El usuario ya existe"}), 409
    
    # Crear usuario
    usuarios[email] = {
        "email": email,
        "password": password,
        "nombre": nombre,
        "documento": documento,
        "telefono": telefono,
        "fecha_registro": datetime.now().isoformat()
    }
    
    return jsonify({
        "message": "Usuario registrado exitosamente",
        "email": email,
        "nombre": nombre
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    """Inicio de sesión"""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    
    email = data.get('email', '').strip()
    password = data.get('password', '')
    
    # Validar campos obligatorios
    if not email or not password:
        return jsonify({"error": "Email y contraseña son obligatorios"}), 400
    
    # Verificar credenciales
    usuario = usuarios.get(email)
    if not usuario or usuario['password'] != password:
        return jsonify({"error": "Credenciales inválidas"}), 401
    
    return jsonify({
        "message": "Login exitoso",
        "usuario": {
            "email": usuario['email'],
            "nombre": usuario['nombre']
        }
    }), 200

@app.route('/api/productos', methods=['GET'])
def get_productos():
    """Obtener lista de productos de ahorro"""
    return jsonify({"productos": productos}), 200

@app.route('/api/productos/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    """Obtener detalle de un producto específico"""
    producto = next((p for p in productos if p['id'] == producto_id), None)
    
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    
    return jsonify({"producto": producto}), 200

@app.route('/api/simular', methods=['POST'])
def simular():
    """Simular ganancia de ahorro"""
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400
    
    monto = data.get('monto')
    producto_id = data.get('producto_id')
    plazo_dias = data.get('plazo_dias', 30)
    
    # Validaciones
    if monto is None:
        return jsonify({"error": "El monto es obligatorio"}), 400
    
    try:
        monto = float(monto)
        plazo_dias = int(plazo_dias)
    except (ValueError, TypeError):
        return jsonify({"error": "Monto o plazo inválido"}), 400
    
    if monto <= 0:
        return jsonify({"error": "El monto debe ser mayor a 0"}), 400
    
    if plazo_dias <= 0:
        return jsonify({"error": "El plazo debe ser mayor a 0 días"}), 400
    
    # Buscar producto
    producto = next((p for p in productos if p['id'] == producto_id), None)
    
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    
    # Validar monto mínimo
    if monto < producto['monto_minimo']:
        return jsonify({
            "error": f"El monto mínimo para este producto es ${producto['monto_minimo']:,.0f}"
        }), 400
    
    # Calcular ganancia
    tasa_interes = producto['tasa_interes'] / 100
    ganancia = monto * tasa_interes * (plazo_dias / 365)
    monto_final = monto + ganancia
    
    return jsonify({
        "producto": producto['nombre'],
        "monto_inicial": monto,
        "tasa_interes": producto['tasa_interes'],
        "plazo_dias": plazo_dias,
        "ganancia": round(ganancia, 2),
        "monto_final": round(monto_final, 2)
    }), 200

@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    """Obtener lista de usuarios (endpoint de prueba)"""
    lista_usuarios = [
        {
            "email": u['email'],
            "nombre": u['nombre'],
            "fecha_registro": u['fecha_registro']
        }
        for u in usuarios.values()
    ]
    return jsonify({"usuarios": lista_usuarios, "total": len(lista_usuarios)}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint no encontrado"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
