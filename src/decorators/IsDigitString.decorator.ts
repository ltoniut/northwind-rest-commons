import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDigitString(
  size: number,
  validationOptions?: ValidationOptions,
) {
  return function isDigitStringRegister(
    object: Record<string, any>,
    propertyName: string,
  ): void {
    registerDecorator({
      name: 'isDigitString',
      target: object.constructor,
      propertyName,
      constraints: [size],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          const [relatedSize] = args.constraints;
          return (
            typeof value === 'string' &&
            value.length <= relatedSize &&
            /^\d+$/.test(value)
          );
        },
      },
    });
  };
}

function customDigitString(
  name: string,
  size: number,
  msg: string,
  validationOptions?: ValidationOptions,
) {
  return function isRegister(
    object: Record<string, any>,
    propertyName: string,
  ): void {
    registerDecorator({
      name,
      target: object.constructor,
      propertyName,
      constraints: [size],
      options: {
        message: msg,
        ...validationOptions,
      },
      validator: {
        // eslint-disable-next-line sonarjs/no-identical-functions
        validate(value: any, args: ValidationArguments): boolean {
          const [relatedSize] = args.constraints;
          return (
            typeof value === 'string' &&
            value.length <= relatedSize &&
            /^\d+$/.test(value)
          );
        },
      },
    });
  };
}

function customValidator(
  name: string,
  msg: string,
  predicate: (v: any) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function isRegister(
    object: Record<string, any>,
    propertyName: string,
  ): void {
    registerDecorator({
      name,
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: msg,
        ...validationOptions,
      },
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments): boolean {
          return predicate(value);
        },
      },
    });
  };
}

export function IsBatch(validationOptions?: ValidationOptions): Function {
  return customDigitString(
    'isBatch',
    7,
    'Batch Format: 7 digits',
    validationOptions,
  );
}

export function IsProduct(validationOptions?: ValidationOptions): Function {
  return customValidator(
    'isProduct',
    'Product Format: 16 digits or letters',
    (v: any) => {
      if (typeof v !== 'string') {
        return false;
      }
      return /^[a-zA-Z0-9]{0,16}/.test(v);
    },
    validationOptions,
  );
}

export function IsLot(validationOptions?: ValidationOptions): Function {
  return customDigitString(
    'isLot',
    16,
    'Lot Format: 16 digits',
    validationOptions,
  );
}

export function IsCodeDate(validationOptions?: ValidationOptions): Function {
  return customDigitString(
    'isCodeDate',
    6,
    'Code Date Format: 6 digits',
    validationOptions,
  );
}
