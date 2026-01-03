# 🏦 Ahorro Digital - Prueba Técnica QA Automation

## 📋 Descripción

**Ahorro Digital** es una aplicación web ficticia diseñada para demostrar habilidades de QA Automation. Los usuarios pueden:
- Registrarse e iniciar sesión
- Explorar productos de ahorro (Cuentas de Ahorro y CDTs)
- Simular ganancias con diferentes montos y plazos

Este proyecto incluye backend (API REST), frontend (HTML/CSS/JS) y pruebas automatizadas con Playwright.

---

## 🎯 Objetivos de la Prueba Técnica

✅ **Plan de pruebas** con objetivos, alcance y análisis de riesgos (P0/P1/P2)  
✅ **15 casos de prueba** documentados (funcionales, negativos, validaciones)  
✅ **Aplicación funcional** (Backend + Frontend)  
✅ **Pruebas automatizadas** con Playwright (UI y API)  
✅ **Reporte de bugs** con evidencia y clasificación por severidad  
✅ **Reportes HTML** de ejecución de pruebas

---

## 📁 Estructura del Proyecto

```
Prueba Tecnica/
├── backend/                  # API REST con Flask
│   ├── app.py               # Servidor Flask con endpoints
│   └── requirements.txt     # Dependencias Python
│
├── frontend/                # Interfaz de usuario
│   ├── index.html          # Página de inicio
│   ├── register.html       # Formulario de registro
│   ├── login.html          # Formulario de login
│   ├── productos.html      # Lista de productos y simulador
│   ├── styles.css          # Estilos CSS
│   ├── register.js         # Lógica de registro
│   ├── login.js            # Lógica de login
│   └── productos.js        # Lógica de productos y simulador
│
├── tests/                   # Pruebas automatizadas
│   ├── specs/              # Archivos de pruebas
│   │   ├── onboarding.spec.js          # Pruebas de registro y login
│   │   ├── productos-simulador.spec.js # Pruebas de productos y simulador
│   │   └── api.spec.js                 # Pruebas de API
│   ├── playwright.config.js # Configuración de Playwright
│   └── package.json        # Dependencias Node.js
│
├── docs/                    # Documentación
│   ├── plan-de-pruebas.md  # Plan de pruebas completo
│   ├── casos-de-prueba.md  # 15 casos de prueba detallados
│   └── reporte-bugs.md     # Reporte de bugs encontrados
│
└── reports/                 # Reportes de ejecución (generados)
    └── playwright-report/   # Reporte HTML de Playwright
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Python 3.8+** instalado
- **Node.js 16+** y npm instalados
- **Git** (opcional, para clonar)

### 1. Instalar Dependencias del Backend

```powershell
cd "Prueba Tecnica\backend"
python -m pip install -r requirements.txt
```

### 2. Instalar Dependencias de Pruebas

```powershell
cd "..\tests"
npm install
npx playwright install chromium
```

---

## ▶️ Ejecutar la Aplicación

### Paso 1: Iniciar el Backend (Terminal 1)

```powershell
cd "Prueba Tecnica\backend"
python app.py
```

✅ El servidor estará disponible en `http://localhost:5000`

### Paso 2: Iniciar el Frontend (Terminal 2)

```powershell
cd "Prueba Tecnica\frontend"
python -m http.server 8000
```

✅ El frontend estará disponible en `http://localhost:8000`

### Paso 3: Abrir la Aplicación

Navega a **http://localhost:8000** en tu navegador.

---

## 🧪 Ejecutar Pruebas Automatizadas

### Opción 1: Ejecutar todas las pruebas

```powershell
cd "Prueba Tecnica\tests"
npm test
```

### Opción 2: Ejecutar con interfaz visual (UI Mode)

```powershell
npm run test:ui
```

### Opción 3: Ejecutar en modo headed (ver navegador)

```powershell
npm run test:headed
```

### Opción 4: Ver reporte HTML

```powershell
npm run test:report
```

El reporte se abrirá automáticamente en tu navegador.

---

## 📊 Endpoints de la API

### Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check del servidor |
| POST | `/register` | Registrar nuevo usuario |
| POST | `/login` | Iniciar sesión |
| GET | `/productos` | Listar productos de ahorro |
| GET | `/productos/:id` | Obtener detalle de producto |
| POST | `/simular` | Simular ganancia de ahorro |

### Ejemplo: Registro de Usuario

```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "documento": "1234567890",
    "email": "juan@test.com",
    "telefono": "3001234567",
    "password": "password123",
    "captcha": "valid_captcha"
  }'
```

### Ejemplo: Simulación de Ahorro

```bash
curl -X POST http://localhost:5000/api/simular \
  -H "Content-Type: application/json" \
  -d '{
    "producto_id": 1,
    "monto": 100000,
    "plazo_dias": 30
  }'
```

---

## 📝 Casos de Prueba Implementados

Se implementaron **15 casos de prueba** cubriendo:

### Prioridad P0 (Crítico) - Onboarding
- TC-001: Registro exitoso con datos válidos ✅
- TC-002: Registro fallido - campos vacíos ✅
- TC-003: Registro fallido - captcha inválido ✅
- TC-005: Login exitoso ✅
- TC-006: Login fallido con credenciales incorrectas ✅
- TC-012: Validación de email inválido ✅
- TC-013: Botón deshabilitado sin captcha ✅
- TC-014: Mensaje de error visible ✅

### Prioridad P1 (Alto) - Simulador
- TC-008: Simulación exitosa ✅
- TC-009: Simulación con monto 0 ✅
- TC-010: Simulación con monto menor al mínimo ✅
- TC-015: Simulación con producto inexistente ✅

### Prioridad P2 (Medio) - Productos y API
- TC-007: Listar productos ✅
- TC-011: Endpoint inexistente (404) ✅
- Pruebas adicionales de API ✅

---

## 🐛 Bugs Encontrados

Durante las pruebas se identificaron **5 bugs** y **5 observaciones**:

### Bugs Críticos
- **BUG-003**: Contraseñas almacenadas en texto plano (P0 - Seguridad)

### Bugs Medios
- **BUG-001**: Falta validación visual en tiempo real de contraseñas (P1)
- **BUG-004**: CORS permite todos los orígenes (P1)

### Bugs Menores
- **BUG-002**: Sin límite de longitud para contraseñas (P2)
- **BUG-005**: Mensajes de error de conexión poco descriptivos (P2)

Ver detalles completos en [docs/reporte-bugs.md](docs/reporte-bugs.md)

---

## 📈 Cobertura de Pruebas

- **Total de pruebas:** 20+
- **Pruebas UI (Playwright):** 12
- **Pruebas API:** 8
- **Cobertura de módulos:** 100%
  - ✅ Onboarding (Registro + Login)
  - ✅ Productos
  - ✅ Simulador
  - ✅ API REST

---

## 🎨 Características Implementadas

### Frontend
- ✅ Diseño responsive y moderno
- ✅ Validación de formularios
- ✅ Mensajes de error y éxito
- ✅ Simulador interactivo con resultados en tiempo real
- ✅ Navegación intuitiva

### Backend
- ✅ API REST con Flask
- ✅ Validaciones de datos
- ✅ Manejo de errores HTTP apropiado
- ✅ Almacenamiento en memoria
- ✅ CORS habilitado

### Testing
- ✅ Pruebas automatizadas con Playwright
- ✅ Pruebas de UI y API
- ✅ Reportes HTML con capturas de pantalla
- ✅ Videos de pruebas fallidas
- ✅ Configuración para CI/CD

---

## 🔧 Tecnologías Utilizadas

### Backend
- **Flask** 3.0.0 - Framework web Python
- **Flask-CORS** - Manejo de CORS

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos (Variables CSS, Grid, Flexbox)
- **JavaScript ES6+** - Lógica del cliente

### Testing
- **Playwright** - Automatización de pruebas
- **Node.js** - Runtime para Playwright

---

## 🎯 Próximos Pasos y Mejoras

### Seguridad
- [ ] Implementar hashing de contraseñas (bcrypt)
- [ ] Agregar autenticación JWT
- [ ] Configurar CORS con whitelist
- [ ] Implementar rate limiting

### Funcionalidad
- [ ] Agregar persistencia con base de datos
- [ ] Implementar logout
- [ ] Historial de simulaciones
- [ ] Recuperación de contraseña

### Testing
- [ ] Pruebas de performance con k6
- [ ] Pruebas de accesibilidad
- [ ] Pruebas en múltiples navegadores
- [ ] Pruebas móviles

### DevOps
- [ ] Dockerizar aplicación
- [ ] Pipeline CI/CD con GitHub Actions
- [ ] Despliegue automático

---

## 📚 Documentación Adicional

- [Plan de Pruebas](docs/plan-de-pruebas.md) - Objetivos, alcance, riesgos
- [Casos de Prueba](docs/casos-de-prueba.md) - 15 casos documentados
- [Reporte de Bugs](docs/reporte-bugs.md) - Bugs y recomendaciones

---

## 🤝 Contribuir

Este es un proyecto de prueba técnica. Para sugerencias o mejoras:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agregar mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos y de demostración.

---

## 👤 Autor

**Cazadora de Bugs Financieros**  
QA Automation Engineer

---

## 🙏 Agradecimientos

Gracias por revisar este proyecto. Fue desarrollado como parte de una prueba técnica para demostrar habilidades en:

- ✅ Análisis y planificación de pruebas
- ✅ Diseño de casos de prueba
- ✅ Desarrollo de aplicaciones web
- ✅ Automatización de pruebas con Playwright
- ✅ Identificación y reporte de bugs
- ✅ Documentación técnica

---

## 📞 Contacto

Para consultas sobre este proyecto, crear un issue en el repositorio de GitHub.

**¡Feliz Testing! 🚀**
