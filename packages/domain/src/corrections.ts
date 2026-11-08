export interface Correction {
  path: string;
  from: unknown;
  to: unknown;
}

/** Proporcion de campos corregidos por el Revisor respecto al total de campos de la Propuesta. */
export function correctedFieldRate(totalFields: number, corrections: Correction[]): number {
  if (totalFields <= 0) return 0;
  const uniquePaths = new Set(corrections.map((c) => c.path));
  return Math.min(uniquePaths.size / totalFields, 1);
}