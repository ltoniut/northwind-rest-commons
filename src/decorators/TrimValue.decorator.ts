/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transform } from 'class-transformer';

const TrimValue = (): any => {
  return Transform((target: any) =>
    typeof target === 'string' ? target.trim() : target,
  );
};

export default TrimValue;
