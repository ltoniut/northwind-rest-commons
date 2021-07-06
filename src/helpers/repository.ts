export function getFilterByValue(
  filterBy: string,
  filterValue: string,
  sep = ',',
): Record<string, string> {
  const names = filterBy.split(sep);
  const values = filterValue.split(sep);
  const nValues = values.length;
  const res = {};
  names.filter(Boolean).forEach((name, idx) => {
    const value = idx < nValues ? values[idx] : '';
    res[name] = value;
  });
  return res;
}

export function distinctIds<T, R>(list: T[], getter: (itm: T) => R): R[] {
  return Array.from(new Set(list.map(getter).filter(Boolean)));
}
