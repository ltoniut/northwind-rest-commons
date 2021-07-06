/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transform } from 'class-transformer';

const DefaultValue = (defaultValue: any): any => {
  return Transform((target: any) => target || defaultValue);
};

export default DefaultValue;
