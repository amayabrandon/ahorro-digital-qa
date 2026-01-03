# Plan de Pruebas - Ahorro Digital

## 1. Información General

**Proyecto:** Ahorro Digital - Aplicación Web de Productos de Ahorro  
**Versión:** 1.0  
**Fecha:** Enero 2026  
**QA Engineer:** Cazadora de Bugs Financieros

---

## 2. Objetivos

### Objetivo General
Garantizar que la aplicación Ahorro Digital funcione correctamente en todos sus componentes críticos antes de salir a producción, proporcionando una experiencia de usuario sin errores y cumpliendo con todos los requisitos funcionales y no funcionales.

### Objetivos Específicos
- ✅ Validar el flujo completo de registro e inicio de sesión (Onboarding)
- ✅ Verificar el correcto funcionamiento del simulador de ahorro
- ✅ Confirmar que todos los productos se muestren correctamente
- ✅ Detectar errores críticos de validación y seguridad
- ✅ Asegurar la correcta integración entre frontend y backend
- ✅ Validar mensajes de error y respuestas del sistema

---

## 3. Alcance

### Incluido en el Alcance
- **Frontend:**
  - Página de inicio
  - Formulario de registro
  - Formulario de inicio de sesión
  - Página de productos
  - Simulador de ahorro
  - Validaciones en el cliente

- **Backend API:**
  - Endpoint de registro (`/api/register`)
  - Endpoint de login (`/api/login`)
  - Endpoint de productos (`/api/productos`)
  - Endpoint de simulación (`/api/simular`)
  - Validaciones del servidor
  - Manejo de errores

- **Tipos de Pruebas:**
  - Pruebas funcionales
  - Pruebas de validación
  - Pruebas negativas
  - Pruebas de API
  - Pruebas de interfaz de usuario

### Excluido del Alcance
- Pruebas de rendimiento y carga
- Pruebas de seguridad avanzadas (penetración)
- Pruebas en múltiples navegadores (solo Chrome en esta fase)
- Pruebas de accesibilidad
- Pruebas en dispositivos móviles nativos

---

## 4. Identificación de Riesgos

### **P0 - Crítico (Onboarding)**
Impacto: Alto | Probabilidad: Media

| ID | Riesgo | Impacto | Mitigación |
|---|---|---|---|
| R-P0-01 | Usuarios no pueden registrarse | Los nuevos usuarios no pueden crear cuentas | Validación exhaustiva del endpoint de registro |
| R-P0-02 | Usuarios no pueden iniciar sesión | Usuarios existentes no pueden acceder | Pruebas de autenticación completas |
| R-P0-03 | Captcha no funciona correctamente | Registro bloqueado | Validación del componente captcha |
| R-P0-04 | Validaciones de campos faltantes | Datos inválidos en la base de datos | Pruebas de validación frontend y backend |

### **P1 - Alto (Simulador)**
Impacto: Alto | Probabilidad: Media

| ID | Riesgo | Impacto | Mitigación |
|---|---|---|---|
| R-P1-01 | Cálculos incorrectos del simulador | Información errónea a los usuarios | Validación de fórmulas y casos límite |
| R-P1-02 | Simulación con monto 0 o negativo | Resultados inválidos | Validación de rangos de entrada |
| R-P1-03 | Errores al simular productos inexistentes | Fallo en la experiencia del usuario | Validación de existencia de productos |
| R-P1-04 | No se valida monto mínimo | Usuarios reciben información incorrecta | Pruebas de reglas de negocio |

### **P2 - Medio (Productos)**
Impacto: Medio | Probabilidad: Baja

| ID | Riesgo | Impacto | Mitigación |
|---|---|---|---|
| R-P2-01 | Lista de productos vacía o incompleta | Usuarios no ven opciones | Validación de endpoint de productos |
| R-P2-02 | Información de producto inconsistente | Confusión en los usuarios | Validación de datos |
| R-P2-03 | Errores 404 en endpoints de producto | Experiencia de usuario interrumpida | Pruebas de manejo de errores |

---

## 5. Criterios de Aceptación

### Criterios de Éxito
- ✅ 0 bugs de severidad P0 sin resolver
- ✅ Máximo 2 bugs de severidad P1 sin resolver
- ✅ Tasa de éxito de pruebas automatizadas ≥ 95%
- ✅ Todos los flujos críticos funcionan correctamente
- ✅ Validaciones frontend y backend implementadas
- ✅ Manejo de errores adecuado en todos los endpoints

### Criterios de Fallo
- ❌ Presencia de bugs P0 sin resolver
- ❌ Más de 5 bugs P1 sin resolver
- ❌ Flujo de registro o login no funcional
- ❌ Simulador produce cálculos incorrectos
- ❌ Tasa de éxito de pruebas < 85%

---

## 6. Estrategia de Pruebas

### 6.1 Tipos de Pruebas

#### Pruebas Funcionales
- Validación de todos los flujos de usuario
- Verificación de funcionalidad de formularios
- Confirmación de cálculos del simulador

#### Pruebas de Validación
- Campos obligatorios
- Formatos de entrada
- Rangos permitidos
- Mensajes de error

#### Pruebas Negativas
- Intentos de registro con datos inválidos
- Login con credenciales incorrectas
- Simulaciones con valores fuera de rango
- Acceso a recursos inexistentes (404)

#### Pruebas de API
- Validación de endpoints REST
- Códigos de respuesta HTTP correctos
- Estructura de datos JSON
- Manejo de errores

### 6.2 Herramientas

- **Automatización UI:** Playwright
- **Pruebas API:** Playwright o Postman
- **Reportes:** HTML Reporter de Playwright
- **Versionamiento:** Git/GitHub

---

## 7. Entregables

1. ✅ Plan de pruebas (este documento)
2. ✅ Casos de prueba documentados (mínimo 10)
3. ✅ Suite de pruebas automatizadas con Playwright
4. ✅ Reporte de ejecución de pruebas (HTML)
5. ✅ Reporte de bugs encontrados con evidencia
6. ✅ Aplicación funcional (backend + frontend)

---

## 8. Cronograma

| Fase | Actividad | Duración Estimada |
|---|---|---|
| 1 | Análisis y diseño del plan | Completado |
| 2 | Diseño de casos de prueba | Completado |
| 3 | Desarrollo de aplicación | Completado |
| 4 | Implementación de pruebas automatizadas | En progreso |
| 5 | Ejecución de pruebas | Pendiente |
| 6 | Reporte de bugs | Pendiente |
| 7 | Documentación final | Pendiente |

---

## 9. Ambientes de Prueba

### Ambiente Local
- **Backend:** http://localhost:5000
- **Frontend:** Archivos HTML estáticos
- **Base de datos:** En memoria (Python dict)

### Tecnologías
- **Backend:** Python 3.x + Flask
- **Frontend:** HTML5 + CSS3 + JavaScript ES6+
- **Automatización:** Playwright + Node.js

---

## 10. Criterios de Entrada y Salida

### Criterios de Entrada
- ✅ Backend desarrollado y funcional
- ✅ Frontend desarrollado y funcional
- ✅ Plan de pruebas aprobado
- ✅ Casos de prueba diseñados

### Criterios de Salida
- ⏳ Todas las pruebas ejecutadas
- ⏳ Bugs documentados con severidad
- ⏳ Tasa de éxito ≥ 95%
- ⏳ Reporte de pruebas generado

---

## 11. Supuestos y Dependencias

### Supuestos
- El servidor backend está disponible en localhost:5000
- Los navegadores modernos soportan ES6+
- Python 3.8+ está instalado
- Node.js está disponible para Playwright

### Dependencias
- Flask y dependencias instaladas
- Playwright configurado correctamente
- Servidor backend en ejecución durante las pruebas

---

## 12. Contactos

**QA Lead:** Cazadora de Bugs Financieros  
**Entrega:** Repositorio público en GitHub
