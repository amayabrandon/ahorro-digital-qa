# Scripts de Utilidad - Ahorro Digital

Este archivo contiene comandos útiles para trabajar con el proyecto.

## Instalación Completa

### Windows PowerShell

```powershell
# Instalar backend
cd "Prueba Tecnica\backend"
python -m pip install -r requirements.txt

# Instalar tests
cd "..\tests"
npm install
npx playwright install chromium

cd ..
```

## Ejecutar Todo el Stack

### Opción 1: Manualmente en 2 terminales

**Terminal 1 - Backend:**
```powershell
cd "Prueba Tecnica\backend"
python app.py
```

**Terminal 2 - Frontend:**
```powershell
cd "Prueba Tecnica\frontend"
python -m http.server 8000
```

### Opción 2: Con archivo .bat (Windows)

Crear archivo `start-servers.bat`:
```batch
@echo off
start "Backend" cmd /k "cd backend && python app.py"
start "Frontend" cmd /k "cd frontend && python -m http.server 8000"
echo Servidores iniciados!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:8000
pause
```

## Comandos de Pruebas

```powershell
cd "Prueba Tecnica\tests"

# Ejecutar todas las pruebas
npm test

# Ejecutar con UI mode
npm run test:ui

# Ejecutar viendo el navegador
npm run test:headed

# Ejecutar solo un archivo
npx playwright test specs/onboarding.spec.js

# Ejecutar en modo debug
npm run test:debug

# Ver reporte
npm run test:report
```

## Limpiar Reportes

```powershell
cd "Prueba Tecnica"
Remove-Item -Recurse -Force reports\*
```

## Verificar que todo funciona

```powershell
# Verificar Python
python --version

# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Playwright
cd tests
npx playwright --version
```

## Pruebas Rápidas de API

```powershell
# Health check
curl http://localhost:5000/health

# Listar productos
curl http://localhost:5000/api/productos

# Registrar usuario (cambiar email cada vez)
curl -X POST http://localhost:5000/api/register `
  -H "Content-Type: application/json" `
  -d '{\"nombre\":\"Test\",\"documento\":\"123\",\"email\":\"test@test.com\",\"password\":\"pass123\",\"captcha\":\"valid_captcha\"}'
```

## Troubleshooting

### Puerto ocupado
```powershell
# Ver qué está usando el puerto 5000
netstat -ano | findstr :5000

# Matar proceso (reemplazar PID)
taskkill /PID <PID> /F
```

### Reinstalar dependencias
```powershell
# Backend
cd backend
pip uninstall -y -r requirements.txt
pip install -r requirements.txt

# Tests
cd ..\tests
Remove-Item -Recurse -Force node_modules
npm install
```

## Git Commands

```powershell
# Inicializar repo
git init
git add .
git commit -m "Initial commit: Proyecto Ahorro Digital QA"

# Subir a GitHub
git remote add origin https://github.com/tu-usuario/ahorro-digital-qa.git
git branch -M main
git push -u origin main
```

## Crear .gitignore

```gitignore
# Python
__pycache__/
*.py[cod]
*.so
.Python
env/
venv/

# Node
node_modules/
npm-debug.log*

# Test reports
test-results/
playwright-report/
reports/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```
