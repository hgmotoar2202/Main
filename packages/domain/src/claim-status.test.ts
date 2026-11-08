import { describe, expect, it } from 'vitest';
import {
  assertTransition,
  canTransition,
  CLAIM_STATUSES,
  DomainError,
  INITIAL_CLAIM_STATUS,
} from './claim-status';

describe('estados del Expediente', () => {
  it('el estado inicial es pendiente de informacion', () => {
    expect(INITIAL_CLAIM_STATUS).toBe('pending_info');
    expect(CLAIM_STATUSES).toContain(INITIAL_CLAIM_STATUS);
  });

  it('el Reportante puede enviar el Reporte', () => {
    expect(canTransition('pending_info', 'preliminary', 'reporter')).toBe(true);
  });

  it('solo el sistema pasa de preliminar a revision humana', () => {
    expect(canTransition('preliminary', 'human_review', 'system')).toBe(true);
    expect(canTransition('preliminary', 'human_review', 'reporter')).toBe(false);
  });

  it('solo un Revisor o un Administrador puede validar', () => {
    expect(canTransition('human_review', 'validated', 'reviewer')).toBe(true);
    expect(canTransition('human_review', 'validated', 'admin')).toBe(true);
    expect(canTransition('human_review', 'validated', 'reporter')).toBe(false);
    expect(canTransition('human_review', 'validated', 'system')).toBe(false);
  });

  it('rechaza transiciones no definidas', () => {
    expect(canTransition('pending_info', 'validated', 'reviewer')).toBe(false);
    expect(canTransition('validated', 'pending_info', 'admin')).toBe(false);
  });

  it('assertTransition lanza un DomainError cuando la transicion no es valida', () => {
    expect(() => assertTransition('pending_info', 'validated', 'reporter')).toThrow(DomainError);
  });
});