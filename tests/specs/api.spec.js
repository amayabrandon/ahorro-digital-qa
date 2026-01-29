import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:5000/api';

test.describe('Pruebas de API (P2)', () => {
  
  test('TC-011: Acceso a endpoint inexistente (404)', async ({ request }) => {
    const response = await request.get(`${API_URL}/endpoint-no-existe`);
    
    // Verificar código 404
    expect(response.status()).toBe(404);
    
    // Verificar mensaje de error 
    const body = await response.json();
    expect(body.error).toBeDefined();
    expect(body.error).toContain('no encontrado');
  });

  test('API: Health check endpoint', async ({ request }) => {
    const response = await request.get('http://localhost:5000/health');
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.timestamp).toBeDefined();
  });

  test('API: Registro con campos vacíos retorna 400', async ({ request }) => {
    const response = await request.post(`${API_URL}/register`, {
      data: {
        email: '',
        password: '',
        nombre: '',
        documento: '',
        captcha: 'valid_captcha'
      }
    });
    
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  test('API: Login sin credenciales retorna 401', async ({ request }) => {
    const response = await request.post(`${API_URL}/login`, {
      data: {
        email: 'noexiste@test.com',
        password: 'wrongpassword'
      }
    });
    
    expect(response.status()).toBe(401);
    
    const body = await response.json();
    expect(body.error).toContain('inválidas');
  });

  test('TC-011: Usuario duplicado retorna 409', async ({ request }) => {
    const timestamp = Date.now();
    const email = `duplicate${timestamp}@test.com`;
    
    // Primera registro - exitoso
    const response1 = await request.post(`${API_URL}/register`, {
      data: {
        nombre: 'Usuario Duplicado',
        documento: '9999999999',
        email: email,
        telefono: '3009999999',
        password: 'password123',
        captcha: 'valid_captcha'
      }
    });
    
    expect(response1.status()).toBe(201);
    
    // Segundo registro con mismo email - debe fallar
    const response2 = await request.post(`${API_URL}/register`, {
      data: {
        nombre: 'Usuario Duplicado 2',
        documento: '8888888888',
        email: email,
        telefono: '3008888888',
        password: 'password456',
        captcha: 'valid_captcha'
      }
    });
    
    expect(response2.status()).toBe(409);
    
    const body = await response2.json();
    expect(body.error).toContain('ya existe');
  });

  test('API: Simulación con datos válidos retorna cálculo correcto', async ({ request }) => {
    const response = await request.post(`${API_URL}/simular`, {
      data: {
        producto_id: 1,
        monto: 100000,
        plazo_dias: 365
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.ganancia).toBeDefined();
    expect(body.monto_final).toBeDefined();
    
    // Verificar cálculo: 100000 * 0.005 * (365/365) = 500
    expect(body.ganancia).toBeCloseTo(500, 1);
    expect(body.monto_final).toBeCloseTo(100500, 1);
  });

  test('API: Captcha inválido en registro retorna 400', async ({ request }) => {
    const response = await request.post(`${API_URL}/register`, {
      data: {
        nombre: 'Test User',
        documento: '1234567890',
        email: 'test@test.com',
        password: 'password123',
        captcha: 'invalid_captcha' // Captcha inválido
      }
    });
    
    expect(response.status()).toBe(400);
    
    const body = await response.json();
    expect(body.error).toContain('Captcha');
  });
});
