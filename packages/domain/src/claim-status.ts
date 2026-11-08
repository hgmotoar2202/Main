export const CLAIM_STATUSES = [
  'pending_info',
  'preliminary',
  'human_review',
  'validated',
  'undetermined',
] as const;

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];

export const INITIAL_CLAIM_STATUS: ClaimStatus = 'pending_info';

export const CLAIM_STATUS_LABELS_ES: Record<ClaimStatus, string> = {
  pending_info: 'Pendiente de información',
  preliminary: 'Preliminar',
  human_review: 'Revisión humana',
  validated: 'Validado por responsable',
  undetermined: 'No determinado',
};

export type Actor = 'reporter' | 'reviewer' | 'admin' | 'system';

interface Transition {
  from: ClaimStatus;
  to: ClaimStatus;
  actors: readonly Actor[];
}

const TRANSITIONS: readonly Transition[] = [
  { from: 'pending_info', to: 'preliminary', actors: ['reporter'] },
  { from: 'preliminary', to: 'human_review', actors: ['system'] },
  { from: 'human_review', to: 'pending_info', actors: ['reviewer', 'admin'] },
  { from: 'human_review', to: 'validated', actors: ['reviewer', 'admin'] },
  { from: 'human_review', to: 'undetermined', actors: ['reviewer', 'admin'] },
  { from: 'validated', to: 'human_review', actors: ['reviewer', 'admin'] },
];

export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export function canTransition(from: ClaimStatus, to: ClaimStatus, actor: Actor): boolean {
  return TRANSITIONS.some((t) => t.from === from && t.to === to && t.actors.includes(actor));
}

export function assertTransition(from: ClaimStatus, to: ClaimStatus, actor: Actor): void {
  if (!canTransition(from, to, actor)) {
    throw new DomainError(
      'INVALID_TRANSITION',
      `Transicion no permitida: ${from} -> ${to} por ${actor}`,
    );
  }
}