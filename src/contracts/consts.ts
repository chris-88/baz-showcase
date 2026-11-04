/**
 * Constant lists the copied contracts validate against, lifted verbatim from the POC's domain
 * modules so this repo has no import of product code.
 */
export const PRODUCTS = [
  'mortgage',
  'current_account',
  'joint_account',
  'credit_card',
  'personal_loan',
  'protection',
  'savings',
] as const
export const DOCUMENT_TYPES = [
  'payslip',
  'bank_statement',
  'photo_id',
  'proof_of_address',
  'salary_certificate',
  /**
   * Whatever the bank asked for after the application went in (`bank-requests.ts`). Never in
   * a journey file, and never named by the model: the request row says what it is.
   */
  'bank_request',
] as const
export const APPLICATION_STATES = [
  'not_started',
  'in_progress',
  'waiting_customer',
  'waiting_partner',
  'ready',
  'submitted',
  'under_review',
  'info_required',
  'approved',
  'declined',
  'paused',
  'completed',
] as const
export const CASE_KINDS = ['customer', 'presenter', 'audience', 'test'] as const
export const CASE_OUTCOMES = ['applied', 'planned', 'explored', 'browsing', 'blocked'] as const
export const CASE_STATUSES = ['blocked', 'needs_review', 'in_progress', 'completed', 'new'] as const
export const NEED_PRIORITIES = ['low', 'medium', 'high', 'very_high'] as const
export const PRESET_NAMES = [
  'default',
  'concise',
  'friendly',
  'formal',
  'dry_humour',
  'poetic',
] as const
export const SLIDER_NAMES = [
  'length',
  'humour',
  'sarcasm',
  'formality',
  'playfulness',
  'poetic',
] as const
