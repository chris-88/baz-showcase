/** Where the tracing wrappers record what the POC's content modules asked of the server. */
export const trace = {
  formatFactValue: {} as Record<string, string>,
  dataNotice: {} as Record<string, unknown>,
  signIn: {} as Record<string, unknown>,
  advisories: [] as unknown[],
  synth: [] as unknown[],
  summary: [] as unknown[],
  maskIban: {} as Record<string, string>,
}
