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
export declare class EnvironmentService {
    private envs;
    constructor();
    getEnvs(): IEnvironmentService;
}
