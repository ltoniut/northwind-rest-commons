import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { projectTitle } from 'typeorm-model-generator/helpers';

export interface IEnvironmentService {
  RDS_TYPE: 'postgres' | 'mysql' | 'mssql';
  RDS_HOSTNAME: string;
  RDS_PORT: number;
  RDS_USERNAME: string;
  RDS_PASSWORD: string;
  RDS_DB_NAME: string;
  APP_ENV: string;
  DIR_DATA: string;
}

export class EnvironmentService {
  private envs: IEnvironmentService;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: Record<string, any> = {};

    try {
      if (environment === 'development') {
        data = dotenv.parse(fs.readFileSync('.env'));
      } else {
        data = {
          ...data,
          ...process.env,
        };
      }
    } catch (e) {
      console.warn(`${projectTitle} - ${e}`);
    }

    data.APP_ENV = environment;
    data.RDS_PORT = parseInt(data.RDS_PORT);

    this.envs = data as IEnvironmentService;
  }

  getEnvs(): IEnvironmentService {
    return this.envs;
  }
}
