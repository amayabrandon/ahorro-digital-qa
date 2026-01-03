# Reporte de Bugs - Ahorro Digital

**Proyecto:** Ahorro Digital  
**Versión:** 1.0  
**Fecha de Reporte:** Enero 2026  
**QA Engineer:** Cazadora de Bugs Financieros

---

## Resumen Ejecutivo

Durante la ejecución de las pruebas se identificaron varios bugs y áreas de mejora. Los bugs se clasifican por severidad:

- **Alta (P0):** Bloqueadores que impiden funcionalidad crítica
- **Media (P1):** Funcionalidad importante afectada pero hay workaround
- **Baja (P2):** Mejoras o bugs menores que no afectan funcionalidad crítica

### Estadísticas
- **Total de bugs encontrados:** 5
- **Severidad Alta:** 0
- **Severidad Media:** 2
- **Severidad Baja:** 3
- **Estado Actual:** 5 Abiertos, 0 Cerrados

---

## Bugs Identificados

### BUG-001: Falta validación de contraseñas que no coinciden en frontend
**Severidad:** Media (P1)  
**Estado:** Abierto  
**Prioridad:** Alta  
**Módulo:** Frontend - Registro

**Descripción:**  
Cuando un usuario ingresa contraseñas diferentes en los campos "Contraseña" y "Confirmar Contraseña", la validación solo ocurre en el frontend JavaScript pero no hay validación visual inmediata (como cambio de color en el campo).

**Pasos para Reproducir:**
1. Ir a la página de registro
2. Llenar todos los campos
3. Ingresar "password123" en Contraseña
4. Ingresar "password456" en Confirmar Contraseña
5. Marcar captcha
6. Hacer clic en "Registrarse"

**Resultado Actual:**  
Se muestra un mensaje de error después de hacer clic en enviar.

**Resultado Esperado:**  
Debería haber validación visual en tiempo real (borde rojo, mensaje debajo del campo) cuando las contraseñas no coinciden.

**Evidencia:**  
```
Error mostrado: "Las contraseñas no coinciden"
Ubicación: register.js línea ~28
```

**Impacto:**  
Experiencia de usuario no óptima. Los usuarios deben esperar hasta enviar el formulario para saber que las contraseñas no coinciden.

**Recomendación:**  
Agregar event listener en el campo "Confirmar Contraseña" para validar en tiempo real.

---

### BUG-002: No hay límite de longitud para el campo de contraseña
**Severidad:** Baja (P2)  
**Estado:** Abierto  
**Prioridad:** Baja  
**Módulo:** Backend + Frontend - Registro/Login

**Descripción:**  
No existe un límite máximo para la longitud de la contraseña, lo cual podría causar problemas de almacenamiento o rendimiento.

**Pasos para Reproducir:**
1. Intentar registrar usuario con contraseña de 10000 caracteres
2. El sistema acepta la contraseña sin límite

**Resultado Actual:**  
Acepta contraseñas de cualquier longitud.

**Resultado Esperado:**  
Debería haber un límite razonable (ej: 128 caracteres).

**Evidencia:**  
```python
# backend/app.py - No hay validación maxlength
password = data.get('password', '')
if not password:
    return jsonify({"error": "La contraseña es obligatoria"}), 400
```

**Impacto:**  
Bajo. Podría causar problemas de performance en casos extremos.

**Recomendación:**  
Agregar validación de longitud máxima (ej: entre 6 y 128 caracteres).

---

### BUG-003: Las contraseñas se almacenan en texto plano
**Severidad:** Alta (P0) - CRÍTICO DE SEGURIDAD  
**Estado:** Abierto  
**Prioridad:** Crítica  
**Módulo:** Backend - Autenticación

**Descripción:**  
Las contraseñas se almacenan en memoria en texto plano sin ningún tipo de hashing o encriptación. En un sistema real esto es una vulnerabilidad crítica.

**Pasos para Reproducir:**
1. Registrar un usuario
2. Inspeccionar la variable `usuarios` en el backend
3. La contraseña es visible en texto plano

**Resultado Actual:**  
```python
usuarios[email] = {
    "password": password,  # ← Texto plano
    ...
}
```

**Resultado Esperado:**  
Las contraseñas deberían estar hasheadas usando bcrypt, argon2 o similar.

**Evidencia:**
```python
# backend/app.py líneas ~45-55
usuarios[email] = {
    "email": email,
    "password": password,  # VULNERABILIDAD
    "nombre": nombre,
    ...
}
```

**Impacto:**  
CRÍTICO. En producción esto sería una vulnerabilidad de seguridad grave. Para esta prueba técnica es aceptable pero debe documentarse.

**Recomendación:**  
Implementar bcrypt o argon2 para hashear contraseñas:
```python
from werkzeug.security import generate_password_hash, check_password_hash
password_hash = generate_password_hash(password)
```

---

### BUG-004: No hay manejo de CORS en ambientes de producción
**Severidad:** Media (P1)  
**Estado:** Abierto  
**Prioridad:** Media  
**Módulo:** Backend - Configuración

**Descripción:**  
Aunque CORS está habilitado con `CORS(app)`, esto permite todos los orígenes. En producción esto debería estar restringido.

**Resultado Actual:**  
```python
CORS(app)  # Permite todos los orígenes
```

**Resultado Esperado:**  
```python
CORS(app, origins=["https://ahorro-digital.com"])
```

**Impacto:**  
Medio. Podría permitir acceso no autorizado desde otros dominios.

**Recomendación:**  
Configurar CORS con lista blanca de orígenes permitidos.

---

### BUG-005: Falta manejo de errores de conexión en el frontend
**Severidad:** Baja (P2)  
**Estado:** Abierto  
**Prioridad:** Baja  
**Módulo:** Frontend - Todos los archivos JS

**Descripción:**  
Cuando el backend no está disponible, los mensajes de error no son muy descriptivos para el usuario.

**Pasos para Reproducir:**
1. Detener el servidor backend
2. Intentar cualquier acción (login, registro, simular)
3. Observar mensaje de error

**Resultado Actual:**  
"Error de conexión con el servidor"

**Resultado Esperado:**  
Mensaje más descriptivo con sugerencias:
- "No se pudo conectar con el servidor. Verifica tu conexión a internet."
- Botón para "Reintentar"
- Indicador visual más claro

**Impacto:**  
Bajo. Afecta experiencia de usuario pero no funcionalidad crítica.

**Recomendación:**  
Mejorar mensajes de error y agregar botón de reintento.

---

## Bugs No Críticos / Observaciones

### OBS-001: Falta validación de formato de teléfono
**Tipo:** Mejora  
**Módulo:** Frontend - Registro

El campo teléfono acepta cualquier texto. Recomendación: agregar validación de formato (ej: solo números, 10 dígitos).

---

### OBS-002: No hay indicador de carga durante peticiones
**Tipo:** Mejora - UX  
**Módulo:** Frontend - General

Durante las peticiones al backend no hay spinner o indicador de carga, solo el texto del botón cambia.

**Recomendación:** Agregar spinner o barra de progreso.

---

### OBS-003: Falta paginación en lista de productos
**Tipo:** Mejora Futura  
**Módulo:** Frontend - Productos

Actualmente solo hay 4 productos, pero en el futuro podría necesitar paginación.

---

### OBS-004: No hay logout
**Tipo:** Mejora  
**Módulo:** Frontend - Navegación

Una vez que el usuario inicia sesión, no hay forma de cerrar sesión.

**Recomendación:** Agregar botón de logout que limpie localStorage.

---

### OBS-005: Simulador no guarda historial
**Tipo:** Mejora  
**Módulo:** Simulador

Las simulaciones no se guardan. Sería útil tener un historial de simulaciones.

---

## Matriz de Priorización

| Bug ID | Severidad | Impacto en Negocio | Esfuerzo | Prioridad |
|--------|-----------|-------------------|----------|-----------|
| BUG-003 | P0 | Alto | Medio | 1 |
| BUG-001 | P1 | Medio | Bajo | 2 |
| BUG-004 | P1 | Medio | Bajo | 3 |
| BUG-002 | P2 | Bajo | Bajo | 4 |
| BUG-005 | P2 | Bajo | Medio | 5 |

---

## Recomendaciones Generales

### 1. Seguridad
- ✅ Implementar hashing de contraseñas (CRÍTICO)
- ✅ Configurar CORS apropiadamente
- ⚠️ Agregar rate limiting para prevenir ataques de fuerza bruta
- ⚠️ Implementar HTTPS en producción
- ⚠️ Agregar tokens JWT para autenticación

### 2. Validación
- ✅ Validación en tiempo real de formularios
- ✅ Límites de longitud en todos los campos
- ⚠️ Sanitización de inputs para prevenir XSS
- ⚠️ Validación de formato de email y teléfono más estricta

### 3. Experiencia de Usuario
- ✅ Indicadores de carga durante peticiones
- ✅ Mensajes de error más descriptivos
- ⚠️ Validación visual en tiempo real
- ⚠️ Funcionalidad de logout
- ⚠️ Recordar usuario (opcional)

### 4. Testing
- ✅ Aumentar cobertura de pruebas
- ⚠️ Agregar pruebas de integración
- ⚠️ Pruebas de performance
- ⚠️ Pruebas de seguridad

### 5. Base de Datos
- ⚠️ Migrar de almacenamiento en memoria a base de datos real
- ⚠️ Implementar persistencia
- ⚠️ Agregar índices para búsquedas

---

## Conclusión

El sistema cumple con los requisitos funcionales básicos y permite realizar todas las operaciones críticas. Los bugs encontrados son principalmente de mejora de UX y seguridad. 

**El bug BUG-003 (contraseñas en texto plano) debe ser resuelto antes de cualquier despliegue en producción.**

Para un MVP o prueba técnica, el estado actual es aceptable, pero se recomienda implementar las mejoras de seguridad antes de producción.

---

**Preparado por:** Cazadora de Bugs Financieros  
**Fecha:** Enero 2026  
**Versión:** 1.0
