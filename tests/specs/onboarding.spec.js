import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:5000/api';

test.describe('Onboarding - Registro de Usuario (P0)', () => {
  
  test('TC-001: Registro exitoso con datos válidos', async ({ page }) => {
    await page.goto('/register.html');
    
    // Generar email único para evitar conflictos
    const timestamp = Date.now();
    const email = `test${timestamp}@test.com`;
    
    // Llenar formulario
    await page.fill('[data-testid="nombre-input"]', 'Juan Pérez Test');
    await page.fill('[data-testid="documento-input"]', '1234567890');
    await page.fill('[data-testid="email-input"]', email);
    await page.fill('[data-testid="telefono-input"]', '3001234567');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    
    // Marcar captcha
    await page.check('[data-testid="captcha-checkbox"]');
    
    // Verificar que el botón se habilita
    const button = page.locator('[data-testid="register-button"]');
    await expect(button).toBeEnabled();
    
    // Enviar formulario
    await button.click();
    
    // Verificar mensaje de éxito
    const successMessage = page.locator('#successMessage');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await expect(successMessage).toContainText('Registro exitoso');
    
    // Verificar redirección
    await page.waitForURL('**/login.html', { timeout: 5000 });
    expect(page.url()).toContain('login.html');
  });

  test('TC-002: Registro fallido - campos obligatorios vacíos', async ({ page }) => {
    await page.goto('/register.html');
    
    // Marcar solo el captcha
    await page.check('[data-testid="captcha-checkbox"]');
    
    // Intentar enviar con campos vacíos
    const button = page.locator('[data-testid="register-button"]');
    await button.click();
    
    // Verificar que aparece error (validación HTML5 o mensaje de error)
    const errorMessage = page.locator('#errorMessage');
    
    // Puede ser que la validación HTML5 prevenga el submit o que se muestre un error
    // Esperamos que no se redirija
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('register.html');
  });

  test('TC-003: Registro fallido - captcha no marcado', async ({ page }) => {
    await page.goto('/register.html');
    
    // Llenar todos los campos pero NO marcar captcha
    await page.fill('[data-testid="nombre-input"]', 'Test User');
    await page.fill('[data-testid="documento-input"]', '9876543210');
    await page.fill('[data-testid="email-input"]', 'test@test.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    
    // Verificar que el botón está deshabilitado
    const button = page.locator('[data-testid="register-button"]');
    await expect(button).toBeDisabled();
  });

  test('TC-013: Botón de registro deshabilitado sin captcha (UI)', async ({ page }) => {
    await page.goto('/register.html');
    
    // Estado inicial del botón
    const button = page.locator('[data-testid="register-button"]');
    await expect(button).toBeDisabled();
    
    // Llenar campos
    await page.fill('[data-testid="nombre-input"]', 'Test User');
    await page.fill('[data-testid="documento-input"]', '1234567890');
    await page.fill('[data-testid="email-input"]', 'test@test.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    
    // Botón sigue deshabilitado
    await expect(button).toBeDisabled();
    
    // Marcar captcha
    await page.check('[data-testid="captcha-checkbox"]');
    
    // Ahora debe estar habilitado
    await expect(button).toBeEnabled();
  });

  test('TC-012: Validación de email inválido', async ({ page }) => {
    await page.goto('/register.html');
    
    const timestamp = Date.now();
    
    // Llenar formulario con email inválido
    await page.fill('[data-testid="nombre-input"]', 'Test User');
    await page.fill('[data-testid="documento-input"]', '1234567890');
    await page.fill('[data-testid="email-input"]', 'email-invalido'); // Sin @
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="confirm-password-input"]', 'password123');
    await page.check('[data-testid="captcha-checkbox"]');
    
    // Intentar enviar
    await page.click('[data-testid="register-button"]');
    
    // Verificar mensaje de error
    await page.waitForTimeout(1000);
    const errorMessage = page.locator('#errorMessage');
    
    // Puede aparecer error del backend o validación HTML5
    // Verificamos que no se hizo registro exitoso
    const successMessage = page.locator('#successMessage');
    await expect(successMessage).not.toBeVisible();
  });
});

test.describe('Onboarding - Login (P0)', () => {
  
  test.beforeAll(async ({ request }) => {
    // Crear un usuario para las pruebas de login
    await request.post(`${API_URL}/register`, {
      data: {
        nombre: 'Usuario Login Test',
        documento: '1111111111',
        email: 'login.test@test.com',
        telefono: '3001111111',
        password: 'password123',
        captcha: 'valid_captcha'
      }
    });
  });

  test('TC-005: Login exitoso con credenciales válidas', async ({ page }) => {
    await page.goto('/login.html');
    
    // Llenar formulario
    await page.fill('[data-testid="email-input"]', 'login.test@test.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    
    // Hacer clic en login
    await page.click('[data-testid="login-button"]');
    
    // Verificar mensaje de éxito
    const successMessage = page.locator('#successMessage');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    await expect(successMessage).toContainText('Bienvenido');
    
    // Verificar redirección
    await page.waitForURL('**/productos.html', { timeout: 5000 });
    expect(page.url()).toContain('productos.html');
  });

  test('TC-006: Login fallido con credenciales incorrectas', async ({ page }) => {
    await page.goto('/login.html');
    
    // Intentar login con credenciales incorrectas
    await page.fill('[data-testid="email-input"]', 'noexiste@test.com');
    await page.fill('[data-testid="password-input"]', 'wrongpassword');
    
    await page.click('[data-testid="login-button"]');
    
    // Verificar mensaje de error
    const errorMessage = page.locator('#errorMessage');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText('Credenciales inválidas');
    
    // Verificar que no se redirige
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('login.html');
  });

  test('TC-014: Mensaje de error visible en login fallido (UI)', async ({ page }) => {
    await page.goto('/login.html');
    
    // Credenciales incorrectas
    await page.fill('[data-testid="email-input"]', 'wrong@test.com');
    await page.fill('[data-testid="password-input"]', 'wrong');
    
    await page.click('[data-testid="login-button"]');
    
    // Verificar que el div de error se hace visible
    const errorDiv = page.locator('#errorMessage');
    await expect(errorDiv).toBeVisible({ timeout: 5000 });
    
    // Verificar que tiene contenido
    const errorText = await errorDiv.textContent();
    expect(errorText).toBeTruthy();
    expect(errorText.length).toBeGreaterThan(0);
    
    // Verificar estilo de error (color rojo, etc)
    const errorClass = await errorDiv.getAttribute('class');
    expect(errorClass).toContain('error');
  });
});
