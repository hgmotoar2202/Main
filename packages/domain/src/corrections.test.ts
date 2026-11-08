import { describe, expect, it } from 'vitest';
import { correctedFieldRate } from './corrections';

describe('correctedFieldRate', () => {
  it('devuelve 0 si no hay campos', () => {
    expect(correctedFieldRate(0, [])).toBe(0);
  });

  it('calcula la proporcion de campos corregidos', () => {
    const corrections = [
      { path: 'basics.location', from: 'a', to: 'b' },
      { path: 'basics.eventTime', from: null, to: '10:30' },
    ];
    expect(correctedFieldRate(8, corrections)).toBe(0.25);
  });

  it('cuenta una sola vez cada campo corregido varias veces', () => {
    const corrections = [
      { path: 'basics.location', from: 'a', to: 'b' },
      { path: 'basics.location', from: 'b', to: 'c' },
    ];
    expect(correctedFieldRate(4, corrections)).toBe(0.25);
  });
});