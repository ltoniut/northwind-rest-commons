import { ValidationOptions } from 'class-validator';
export declare function IsDigitString(size: number, validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
export declare function IsBatch(validationOptions?: ValidationOptions): Function;
export declare function IsProduct(validationOptions?: ValidationOptions): Function;
export declare function IsLot(validationOptions?: ValidationOptions): Function;
export declare function IsCodeDate(validationOptions?: ValidationOptions): Function;
