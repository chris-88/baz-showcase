import type { AdminRequest, GuardrailTest, PersonaPreview } from '@/contracts/admin'

/**
 * The console's API, as this site sees it: there is no console behind it.
 *
 * The cutaway renders the console's own screens inert, so none of these run. They exist so the
 * copied components keep their types, and they refuse loudly if anything ever does call them.
 */
const unavailable = (): Promise<never> =>
  Promise.reject(new Error('The console is not part of the showcase site.'))

export const adminApi = {
  testGuardrail: (_message: string): Promise<GuardrailTest> => unavailable(),
  previewPersona: (
    _sliders: Extract<AdminRequest, { action: 'preview_persona' }>['sliders'],
    _message: string,
  ): Promise<PersonaPreview> => unavailable(),
  setKillSwitch: (_enabled: boolean): Promise<unknown> => unavailable(),
  setPersona: (
    _body: Omit<Extract<AdminRequest, { action: 'set_persona' }>, 'action'>,
  ): Promise<unknown> => unavailable(),
}
