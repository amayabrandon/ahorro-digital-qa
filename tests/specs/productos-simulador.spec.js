import { test, expect } from '@playwright/test';

const API_URL = 'http://localhost:5000/api';

test.describe('Simulador de Ahorro (P1)', () => {
  
  test('TC-008: Simulación exitosa con datos válidos', async ({ page }) => {
    await page.goto('/productos.html');
    
    // Esperar a que carguen los productos
    await page.waitForSelector('[data-testid="product-card-1"]', { timeout: 5000 });
    
    // Llenar formulario de simulación
    await page.selectOption('[data-testid="producto-select"]', '1'); // Cuenta Tradicional
    await page.fill('[data-testid="monto-input"]', '100000');
    await page.fill('[data-testid="plazo-input"]', '30');
    
    // Hacer clic en simular
    await page.click('[data-testid="simular-button"]');
    
    // Verificar que se muestra el resultado
    const resultDiv = page.locator('#simulatorResult');
    await expect(resultDiv).toBeVisible({ timeout: 5000 });
    
    // Verificar que los valores se muestran
    await expect(page.locator('#resultProducto')).toContainText('Tradicional');
    await expect(page.locator('#resultMontoInicial')).toContainText('100.000');
    await expect(page.locator('#resultTasa')).toContainText('0.5 % EA');
    await expect(page.locator('#resultPlazo')).toContainText('30 días');
    await expect(page.locator('#resultGanancia')).toBeVisible();
    await expect(page.locator('#resultMontoFinal')).toBeVisible();
  });

  test('TC-009: Simulación fallida con monto 0', async ({ page }) => {
    await page.goto('/productos.html');
    
    // Esperar a que carguen los productos
    await page.waitForSelector('[data-testid="producto-select"]', { timeout: 5000 });
    
    // Intentar simular con monto 0
    await page.selectOption('[data-testid="producto-select"]', '1');
    await page.fill('[data-testid="monto-input"]', '0');
    await page.fill('[data-testid="plazo-input"]', '30');
    
    await page.click('[data-testid="simular-button"]');
    
    // Verificar mensaje de error
    const errorDiv = page.locator('#simulatorError');
    await expect(errorDiv).toBeVisible({ timeout: 5000 });
    await expect(errorDiv).toContainText('mayor a 0');
  });

  test('TC-010: Simulación fallida - monto menor al mínimo', async ({ page }) => {
    await page.goto('/productos.html');
    
    // Esperar a que carguen los productos
    await page.waitForSelector('[data-testid="producto-select"]', { timeout: 5000 });
    
    // Cuenta Tradicional requiere mínimo $50,000
    await page.selectOption('[data-testid="producto-select"]', '1');
    await page.fill('[data-testid="monto-input"]', '10000'); // Menor al mínimo
    await page.fill('[data-testid="plazo-input"]', '30');
    
    await page.click('[data-testid="simular-button"]');
    
    // Verificar mensaje de error
    const errorDiv = page.locator('#simulatorError');
    await expect(errorDiv).toBeVisible({ timeout: 5000 });
    await expect(errorDiv).toContainText('monto mínimo');
  });

  test('TC-015: Simulación con producto inexistente (API)', async ({ request }) => {
    const response = await request.post(`${API_URL}/simular`, {
      data: {
        producto_id: 999, // Producto que no existe
        monto: 100000,
        plazo_dias: 30
      }
    });
    
    // Verificar código de respuesta 404
    expect(response.status()).toBe(404);
    
    // Verificar mensaje de error
    const body = await response.json();
    expect(body.error).toContain('no encontrado');
  });
});
cd 
test.describe('Productos (P2)', () => {
  
  test('TC-007: Listar productos de ahorro', async ({ page }) => {
    await page.goto('/productos.html');
    
    // Verificar que se muestran los productos
    await expect(page.locator('[data-testid="product-card-1"]')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('[data-testid="product-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-card-4"]')).toBeVisible();
    
    // Verificar que cada producto tiene la información necesaria
    const card1 = page.locator('[data-testid="product-card-1"]');
    await expect(card1).toContainText('0.5');
    await expect(card1).toContainText('50');
  });

  test('TC-007: Listar productos - API', async ({ request }) => {
    const response = await request.get(`${API_URL}/productos`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.productos).toBeDefined();
    expect(body.productos.length).toBe(4);
    
    // Verificar estructura de productos
    const producto = body.productos[0];
    expect(producto).toHaveProperty('id');
    expect(producto).toHaveProperty('nombre');
    expect(producto).toHaveProperty('tasa_interes');
    expect(producto).toHaveProperty('monto_minimo');
    expect(producto).toHaveProperty('descripcion');
  });
});
