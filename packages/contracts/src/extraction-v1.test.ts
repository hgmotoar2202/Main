import { describe, expect, it } from 'vitest';
import { ExtractionV1Schema } from './extraction-v1';

const valid = {
  schemaVersion: 'extraction.v1',
  dimensions: {
    nature: { value: 'traffic', uncertainty: 'low', support: 'me cai de la moto' },
    context: { value: 'labor', uncertainty: 'medium', support: 'iba hacia mi trabajo' },
    laborRelation: { value: 'commute', uncertainty: 'medium', support: 'camino al trabajo' },
    insuranceScope: { value: null, uncertainty: 'high', support: null },
  },
  fields: [
    {
      path: 'basics.eventDate',
      value: '2026-11-03',
      uncertainty: 'low',
      support: 'el lunes 3 de noviembre',
    },
  ],
  missingFields: [{ path: 'basics.eventTime', reason: 'El relato no menciona la hora' }],
  contradictions: [],
  clarifyingQuestions: [{ targets: ['basics.eventTime'], text: 'A que hora ocurrio el evento?' }],
  limitations: ['No se indica si hubo otros vehiculos'],
  humanReviewRequired: true,
};

describe('ExtractionV1Schema', () => {
  it('acepta una Propuesta valida', () => {
    expect(ExtractionV1Schema.safeParse(valid).success).toBe(true);
  });

  it('exige revision humana', () => {
    const result = ExtractionV1Schema.safeParse({ ...valid, humanReviewRequired: false });
    expect(result.success).toBe(false);
  });

  it('rechaza campos que no pertenecen al contrato (por ejemplo, decisiones de cobertura)', () => {
    const result = ExtractionV1Schema.safeParse({ ...valid, coverageDecision: 'approved' });
    expect(result.success).toBe(false);
  });

  it('rechaza mas de 5 Preguntas de aclaracion', () => {
    const questions = Array.from({ length: 6 }, (_, i) => ({
      targets: ['basics.location'],
      text: `Pregunta ${i}`,
    }));
    const result = ExtractionV1Schema.safeParse({ ...valid, clarifyingQuestions: questions });
    expect(result.success).toBe(false);
  });

  it('rechaza valores fuera del catalogo de una Dimension', () => {
    const bad = {
      ...valid,
      dimensions: {
        ...valid.dimensions,
        nature: { value: 'explosion', uncertainty: 'low', support: null },
      },
    };
    expect(ExtractionV1Schema.safeParse(bad).success).toBe(false);
  });

  it('rechaza una incertidumbre expresada como numero', () => {
    const bad = {
      ...valid,
      fields: [{ path: 'basics.location', value: 'x', uncertainty: 0.9, support: null }],
    };
    expect(ExtractionV1Schema.safeParse(bad).success).toBe(false);
  });
});