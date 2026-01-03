# Casos de Prueba - Ahorro Digital

## Índice de Casos de Prueba

| ID | Nombre | Prioridad | Tipo |
|---|---|---|---|
| TC-001 | Registro exitoso con datos válidos | P0 | Funcional |
| TC-002 | Registro fallido - campos obligatorios vacíos | P0 | Validación |
| TC-003 | Registro fallido - captcha inválido | P0 | Validación |
| TC-004 | Registro fallido - usuario duplicado | P0 | Negativo |
| TC-005 | Login exitoso con credenciales válidas | P0 | Funcional |
| TC-006 | Login fallido con credenciales incorrectas | P0 | Negativo |
| TC-007 | Listar productos de ahorro | P2 | Funcional |
| TC-008 | Simulación exitosa con datos válidos | P1 | Funcional |
| TC-009 | Simulación fallida con monto 0 | P1 | Negativo |
| TC-010 | Simulación fallida - monto menor al mínimo | P1 | Validación |
| TC-011 | Acceso a endpoint inexistente (404) | P2 | Negativo |
| TC-012 | Validación de email inválido | P0 | Validación |
| TC-013 | Botón de registro deshabilitado sin captcha | P0 | UI |
| TC-014 | Mensaje de error visible en login fallido | P0 | UI |
| TC-015 | Simulación con producto inexistente | P1 | Negativo |

---

## Casos de Prueba Detallados

---

### **TC-001: Registro exitoso con datos válidos**

**Prioridad:** P0 - Crítico  
**Tipo:** Funcional  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que un usuario puede registrarse exitosamente con todos los datos válidos.

**Precondiciones:**
- Backend en ejecución
- Frontend accesible
- Usuario no existe previamente

**Datos de Prueba:**
```json
{
  "nombre": "Juan Pérez",
  "documento": "1234567890",
  "email": "juan.perez@test.com",
  "telefono": "3001234567",
  "password": "password123",
  "captcha": true
}
```

**Pasos:**
1. Navegar a la página de registro
2. Llenar campo "Nombre Completo" con "Juan Pérez"
3. Llenar campo "Documento" con "1234567890"
4. Llenar campo "Email" con "juan.perez@test.com"
5. Llenar campo "Teléfono" con "3001234567"
6. Llenar campo "Contraseña" con "password123"
7. Llenar campo "Confirmar Contraseña" con "password123"
8. Marcar checkbox de captcha
9. Hacer clic en botón "Registrarse"

**Resultado Esperado:**
- ✅ Mensaje de éxito visible: "Registro exitoso! Redirigiendo..."
- ✅ Usuario creado en el backend
- ✅ Redirección a página de login después de 2 segundos
- ✅ Código de respuesta HTTP 201

---

### **TC-002: Registro fallido - campos obligatorios vacíos**

**Prioridad:** P0 - Crítico  
**Tipo:** Validación  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que el sistema valida correctamente los campos obligatorios vacíos.

**Precondiciones:**
- Backend en ejecución
- Frontend accesible

**Pasos:**
1. Navegar a la página de registro
2. Dejar todos los campos vacíos
3. Marcar checkbox de captcha
4. Hacer clic en botón "Registrarse"

**Resultado Esperado:**
- ✅ Mensaje de error visible: "El nombre es obligatorio" (o similar)
- ✅ No se envía la solicitud al backend
- ✅ Usuario permanece en la página de registro
- ✅ Código de respuesta HTTP 400

---

### **TC-003: Registro fallido - captcha inválido**

**Prioridad:** P0 - Crítico  
**Tipo:** Validación  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que el sistema rechaza registros sin captcha validado.

**Precondiciones:**
- Backend en ejecución
- Frontend accesible

**Datos de Prueba:**
```json
{
  "nombre": "Test User",
  "documento": "9876543210",
  "email": "test@test.com",
  "password": "password123",
  "captcha": false
}
```

**Pasos:**
1. Navegar a la página de registro
2. Llenar todos los campos obligatorios
3. NO marcar el checkbox de captcha
4. Observar el estado del botón "Registrarse"

**Resultado Esperado:**
- ✅ Botón "Registrarse" permanece deshabilitado
- ✅ No se puede enviar el formulario
- ✅ Mensaje de error: "Captcha inválido" si se intenta enviar
- ✅ Código de respuesta HTTP 400

---

### **TC-004: Registro fallido - usuario duplicado**

**Prioridad:** P0 - Crítico  
**Tipo:** Negativo  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que el sistema rechaza registros con email ya existente.

**Precondiciones:**
- Usuario con email "existente@test.com" ya registrado

**Datos de Prueba:**
```json
{
  "nombre": "Usuario Nuevo",
  "documento": "1111111111",
  "email": "existente@test.com",
  "password": "password123",
  "captcha": true
}
```

**Pasos:**
1. Registrar un usuario con email "existente@test.com"
2. Intentar registrar otro usuario con el mismo email
3. Observar respuesta del sistema

**Resultado Esperado:**
- ✅ Mensaje de error: "El usuario ya existe"
- ✅ No se crea usuario duplicado
- ✅ Código de respuesta HTTP 409 (Conflict)

---

### **TC-005: Login exitoso con credenciales válidas**

**Prioridad:** P0 - Crítico  
**Tipo:** Funcional  
**Módulo:** Onboarding - Login

**Objetivo:**  
Verificar que un usuario registrado puede iniciar sesión correctamente.

**Precondiciones:**
- Usuario registrado previamente
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "email": "juan.perez@test.com",
  "password": "password123"
}
```

**Pasos:**
1. Navegar a la página de login
2. Ingresar email "juan.perez@test.com"
3. Ingresar contraseña "password123"
4. Hacer clic en "Iniciar Sesión"

**Resultado Esperado:**
- ✅ Mensaje de éxito: "¡Bienvenido Juan Pérez!"
- ✅ Código de respuesta HTTP 200
- ✅ Redirección a página de productos
- ✅ Datos de usuario guardados en localStorage

---

### **TC-006: Login fallido con credenciales incorrectas**

**Prioridad:** P0 - Crítico  
**Tipo:** Negativo  
**Módulo:** Onboarding - Login

**Objetivo:**  
Verificar que el sistema rechaza intentos de login con credenciales inválidas.

**Precondiciones:**
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "email": "noexiste@test.com",
  "password": "wrongpassword"
}
```

**Pasos:**
1. Navegar a la página de login
2. Ingresar email de usuario no existente
3. Ingresar contraseña incorrecta
4. Hacer clic en "Iniciar Sesión"

**Resultado Esperado:**
- ✅ Mensaje de error: "Credenciales inválidas"
- ✅ No se inicia sesión
- ✅ Usuario permanece en página de login
- ✅ Código de respuesta HTTP 401 (Unauthorized)

---

### **TC-007: Listar productos de ahorro**

**Prioridad:** P2 - Medio  
**Tipo:** Funcional  
**Módulo:** Productos

**Objetivo:**  
Verificar que todos los productos de ahorro se listan correctamente.

**Precondiciones:**
- Backend en ejecución
- Productos cargados en el backend

**Pasos:**
1. Navegar a la página de productos
2. Observar la lista de productos
3. Verificar información de cada producto

**Resultado Esperado:**
- ✅ Se muestran 4 productos
- ✅ Cada producto muestra: nombre, tasa, descripción, monto mínimo
- ✅ Tasas de interés correctas
- ✅ Código de respuesta HTTP 200

**Productos Esperados:**
1. Cuenta de Ahorros Tradicional - 0.5%
2. Cuenta de Ahorros Premium - 1.2%
3. CDT 90 días - 3.5%
4. CDT 180 días - 4.2%

---

### **TC-008: Simulación exitosa con datos válidos**

**Prioridad:** P1 - Alto  
**Tipo:** Funcional  
**Módulo:** Simulador

**Objetivo:**  
Verificar que el simulador calcula correctamente las ganancias.

**Precondiciones:**
- Backend en ejecución
- Productos disponibles

**Datos de Prueba:**
```json
{
  "producto_id": 1,
  "monto": 100000,
  "plazo_dias": 30
}
```

**Pasos:**
1. Navegar a la página de productos
2. Seleccionar "Cuenta de Ahorros Tradicional"
3. Ingresar monto: 100000
4. Ingresar plazo: 30 días
5. Hacer clic en "Simular"

**Resultado Esperado:**
- ✅ Resultado visible en la interfaz
- ✅ Cálculo correcto: ganancia ≈ 41.10 (0.5% anual por 30 días)
- ✅ Monto final = monto inicial + ganancia
- ✅ Código de respuesta HTTP 200

**Fórmula:** ganancia = monto × (tasa/100) × (días/365)

---

### **TC-009: Simulación fallida con monto 0**

**Prioridad:** P1 - Alto  
**Tipo:** Negativo  
**Módulo:** Simulador

**Objetivo:**  
Verificar que el sistema rechaza simulaciones con monto 0 o negativo.

**Precondiciones:**
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "producto_id": 1,
  "monto": 0,
  "plazo_dias": 30
}
```

**Pasos:**
1. Navegar a la página de productos
2. Seleccionar un producto
3. Ingresar monto: 0
4. Intentar simular

**Resultado Esperado:**
- ✅ Mensaje de error: "El monto debe ser mayor a 0"
- ✅ No se realiza cálculo
- ✅ Código de respuesta HTTP 400

---

### **TC-010: Simulación fallida - monto menor al mínimo**

**Prioridad:** P1 - Alto  
**Tipo:** Validación  
**Módulo:** Simulador

**Objetivo:**  
Verificar que el sistema valida el monto mínimo requerido por producto.

**Precondiciones:**
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "producto_id": 1,
  "monto": 10000,
  "plazo_dias": 30
}
```

**Pasos:**
1. Navegar a la página de productos
2. Seleccionar "Cuenta de Ahorros Tradicional" (mínimo: $50,000)
3. Ingresar monto: 10000 (menor al mínimo)
4. Intentar simular

**Resultado Esperado:**
- ✅ Mensaje de error: "El monto mínimo para este producto es $50,000"
- ✅ No se realiza cálculo
- ✅ Código de respuesta HTTP 400

---

### **TC-011: Acceso a endpoint inexistente (404)**

**Prioridad:** P2 - Medio  
**Tipo:** Negativo  
**Módulo:** API

**Objetivo:**  
Verificar que el sistema maneja correctamente peticiones a endpoints inexistentes.

**Precondiciones:**
- Backend en ejecución

**Pasos:**
1. Realizar petición GET a `/api/endpoint-no-existe`

**Resultado Esperado:**
- ✅ Código de respuesta HTTP 404
- ✅ Mensaje de error en JSON: "Endpoint no encontrado"
- ✅ No se genera error en el servidor

---

### **TC-012: Validación de email inválido**

**Prioridad:** P0 - Crítico  
**Tipo:** Validación  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que el sistema valida el formato de email.

**Precondiciones:**
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "nombre": "Test User",
  "documento": "1234567890",
  "email": "email-invalido",
  "password": "password123",
  "captcha": true
}
```

**Pasos:**
1. Intentar registrar con email sin formato válido
2. Observar respuesta

**Resultado Esperado:**
- ✅ Mensaje de error: "Email inválido"
- ✅ Código de respuesta HTTP 400
- ✅ Usuario no creado

---

### **TC-013: Botón de registro deshabilitado sin captcha**

**Prioridad:** P0 - Crítico  
**Tipo:** UI - Validación  
**Módulo:** Onboarding - Registro

**Objetivo:**  
Verificar que el botón de registro está deshabilitado si no se marca el captcha.

**Precondiciones:**
- Frontend accesible

**Pasos:**
1. Navegar a página de registro
2. Observar estado inicial del botón
3. Llenar todos los campos
4. NO marcar captcha
5. Intentar hacer clic en "Registrarse"

**Resultado Esperado:**
- ✅ Botón "Registrarse" está deshabilitado (disabled)
- ✅ No se puede hacer clic
- ✅ Estilo visual indica estado deshabilitado

---

### **TC-014: Mensaje de error visible en login fallido**

**Prioridad:** P0 - Crítico  
**Tipo:** UI - Validación  
**Módulo:** Onboarding - Login

**Objetivo:**  
Verificar que los mensajes de error son visibles y claros para el usuario.

**Precondiciones:**
- Frontend accesible

**Pasos:**
1. Navegar a página de login
2. Ingresar credenciales incorrectas
3. Hacer clic en "Iniciar Sesión"
4. Observar mensaje de error

**Resultado Esperado:**
- ✅ Div de error se hace visible
- ✅ Mensaje claro: "Credenciales inválidas"
- ✅ Color rojo o indicador visual de error
- ✅ Usuario puede intentar nuevamente

---

### **TC-015: Simulación con producto inexistente**

**Prioridad:** P1 - Alto  
**Tipo:** Negativo  
**Módulo:** Simulador

**Objetivo:**  
Verificar que el sistema maneja correctamente simulaciones con productos inexistentes.

**Precondiciones:**
- Backend en ejecución

**Datos de Prueba:**
```json
{
  "producto_id": 999,
  "monto": 100000,
  "plazo_dias": 30
}
```

**Pasos:**
1. Hacer petición POST a `/api/simular` con producto_id inexistente

**Resultado Esperado:**
- ✅ Código de respuesta HTTP 404
- ✅ Mensaje de error: "Producto no encontrado"
- ✅ No se realiza cálculo

---

## Matriz de Cobertura

| Módulo | Total Casos | P0 | P1 | P2 |
|---|---|---|---|---|
| Onboarding | 8 | 7 | 0 | 1 |
| Simulador | 4 | 0 | 4 | 0 |
| Productos | 2 | 0 | 0 | 2 |
| API | 1 | 0 | 0 | 1 |
| **TOTAL** | **15** | **7** | **4** | **4** |

---

## Resumen de Cobertura

- ✅ **Casos Funcionales:** 5
- ✅ **Casos de Validación:** 6
- ✅ **Casos Negativos:** 6
- ✅ **Casos de UI:** 2

**Total:** 15 casos de prueba (>10 requeridos)
