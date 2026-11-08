import { z } from 'zod';

export const EXTRACTION_SCHEMA_VERSION = 'extraction.v1' as const;

export const UNCERTAINTY_LEVELS = ['low', 'medium', 'high'] as const;
export const NATURE_VALUES = [
  'traffic',
  'fall',
  'blow',
  'cut',
  'burn',
  'other',
  'undetermined',
] as const;
export const CONTEXT_VALUES = ['labor', 'personal', 'recreational', 'commute', 'unknown'] as const;
export const LABOR_RELATION_VALUES = [
  'during_shift',
  'on_assignment',
  'commute',
  'employer_transport',
  'not_applicable',
  'to_verify',
] as const;

const uncertainty = z.enum(UNCERTAINTY_LEVELS);
const support = z.string().nullable();

function dimension<T extends readonly [string, ...string[]]>(values: T) {
  return z
    .object({
      value: z.enum(values).nullable(),
      uncertainty,
      support,
    })
    .strict();
}

/**
 * Contrato de salida de cualquier Proveedor de IA.
 * Es estricto: cualquier campo desconocido (por ejemplo, una decision de cobertura) se rechaza.
 */
export const ExtractionV1Schema = z
  .object({
    schemaVersion: z.literal(EXTRACTION_SCHEMA_VERSION),
    dimensions: z
      .object({
        nature: dimension(NATURE_VALUES),
        context: dimension(CONTEXT_VALUES),
        laborRelation: dimension(LABOR_RELATION_VALUES),
        insuranceScope: z
          .object({ value: z.string().nullable(), uncertainty, support })
          .strict(),
      })
      .strict(),
    fields: z.array(
      z.object({ path: z.string().min(1), value: z.unknown(), uncertainty, support }).strict(),
    ),
    missingFields: z.array(
      z.object({ path: z.string().min(1), reason: z.string().min(1) }).strict(),
    ),
    contradictions: z.array(
      z
        .object({ paths: z.array(z.string().min(1)).min(2), description: z.string().min(1) })
        .strict(),
    ),
    clarifyingQuestions: z
      .array(
        z
          .object({ targets: z.array(z.string().min(1)).min(1), text: z.string().min(1) })
          .strict(),
      )
      .max(5),
    limitations: z.array(z.string()),
    humanReviewRequired: z.literal(true),
  })
  .strict();

export type ExtractionV1 = z.infer<typeof ExtractionV1Schema>;