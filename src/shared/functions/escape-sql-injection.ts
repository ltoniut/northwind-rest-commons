export function isEscapedSQLInjection(value: string): boolean {
  return !(value.includes("'") || value.includes('"') || value.includes('\\'));
}

export function safeSQLLiteral(value: string): string {
  return value.replace(/'|"\/\/|;/gi, '');
}
