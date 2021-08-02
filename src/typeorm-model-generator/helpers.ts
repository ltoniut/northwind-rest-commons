export const projectTitle = 'Rest Commons';

export function camelize(value: string): string {
  return value.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (__match, prevPart, nextPart): string => {
      return nextPart ? nextPart.toUpperCase() : prevPart.toLowerCase();
    },
  );
}

export const sqlServerToJSTypes = {
  char: 'string',
  varchar: 'string',
  text: 'string',
  nchar: 'string',
  nvarchar: 'string',
  ntext: 'string',
  binary: 'string',
  varbinary: 'string',
  image: 'string',
  bit: 'number',
  tinyint: 'number',
  smallint: 'number',
  int: 'number',
  bigint: 'number',
  decimal: 'number',
  numeric: 'number',
  smallmoney: 'number',
  money: 'number',
  float: 'number',
  real: 'number',
  datetime: 'Date',
  datetime2: 'Date',
  smalldatetime: 'Date',
  date: 'Date',
  time: 'Date',
  datetimeoffset: 'Date',
  timestamp: 'Date',
  longblob: 'string',
};

export const camelizeCapitalized = (string: string): string => {
  return `${string[0].toUpperCase()}${camelize(string.substr(1))}`;
};
