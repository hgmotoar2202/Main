import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('responde ok e indica la version del esquema de extraccion', () => {
    const result = new HealthController().check();
    expect(result.status).toBe('ok');
    expect(result.extractionSchema).toBe('extraction.v1');
  });
});