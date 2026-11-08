import { loadEnv } from './env';

describe('loadEnv', () => {
  it('usa el Proveedor simulado y el puerto 3001 por defecto', () => {
    const env = loadEnv({});
    expect(env.AI_PROVIDER).toBe('simulated');
    expect(env.PORT).toBe(3001);
  });

  it('rechaza un proveedor de IA desconocido', () => {
    expect(() => loadEnv({ AI_PROVIDER: 'otro' })).toThrow('Configuracion invalida');
  });

  it('rechaza un JWT_SECRET demasiado corto', () => {
    expect(() => loadEnv({ JWT_SECRET: 'corto' })).toThrow('Configuracion invalida');
  });
});