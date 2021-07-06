"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const typeorm_1 = require("typeorm");
const helpers_1 = require("typeorm-model-generator/helpers");
const environment_service_1 = require("typeorm-model-generator/environment-service");
const SP_REGEX = /sp_|usp_/gi;
const parseSPName = (name) => {
    return name.toLowerCase().replace(SP_REGEX, '');
};
const parseStoredProcedures = (
// eslint-disable-next-line @typescript-eslint/ban-types
storedProcedureSchema) => {
    return storedProcedureSchema.reduce((
    // eslint-disable-next-line @typescript-eslint/ban-types
    accumulator, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item) => {
        const key = item.storedProcedureName;
        const storedProcedureNameNormalized = helpers_1.camelizeCapitalized(parseSPName(key));
        const columnNameNormalized = helpers_1.camelize(item.columnName.toLowerCase().replace(/@/gi, ''));
        const storedProcedureItem = Object.assign(Object.assign({}, item), { jsType: helpers_1.sqlServerToJSTypes[item.dataType], columnNameNormalized,
            storedProcedureNameNormalized });
        if (accumulator[key]) {
            accumulator[key].push(storedProcedureItem);
        }
        else {
            accumulator[key] = [storedProcedureItem];
        }
        return accumulator;
    }, {});
};
const generateInterfaceFiles = (storedProcedures) => {
    const dirSp = 'src/typeorm/stored-procedures';
    const dirSpInterfaces = 'src/typeorm/stored-procedures/interfaces';
    const dirSpDtos = 'src/typeorm/stored-procedures/dtos';
    fs.mkdir(dirSp, { recursive: true }, err => {
        if (err) {
            console.error(`${helpers_1.projectTitle} - ${err}`);
        }
        else {
            fs.mkdir(dirSpInterfaces, { recursive: true }, err => {
                if (err) {
                    console.error(`${helpers_1.projectTitle} - ${err}`);
                }
                else {
                    fs.mkdir(dirSpDtos, { recursive: true }, err => {
                        if (err) {
                            console.error(`${helpers_1.projectTitle} - ${err}`);
                        }
                        else {
                            const contentsMethods = [];
                            const interfaceIndexContents = [];
                            const dtoIndexContents = [];
                            Object.keys(storedProcedures).forEach((storedProcedureName) => {
                                const fields = storedProcedures[storedProcedureName];
                                const spName = fields[0].storedProcedureNameNormalized;
                                const fileName = `${storedProcedureName
                                    .replace(/sp_|usp_/gi, '')
                                    .toLowerCase()}`;
                                const interfaceName = `${spName}Params`;
                                const dtoName = `${spName}SPDTO`;
                                const interfaceFileName = `${fileName}.interface`;
                                const dtoFileName = `${fileName}.dto`;
                                let dtoColumn = null;
                                let cmdInterfaceFileName;
                                cmdInterfaceFileName = `export type {\n`;
                                cmdInterfaceFileName += `  ${interfaceName}\n`;
                                cmdInterfaceFileName += `} from './${interfaceFileName}'`;
                                interfaceIndexContents.push(cmdInterfaceFileName);
                                let cmdDtoFileName;
                                cmdDtoFileName = `export {\n`;
                                cmdDtoFileName += `  ${dtoName}\n`;
                                cmdDtoFileName += `} from './${dtoFileName}'`;
                                dtoIndexContents.push(cmdDtoFileName);
                                const columns = fields.reduce((accumulator, field) => {
                                    const columnName = helpers_1.camelize(field.columnNameNormalized);
                                    // @out params are responses from the SP so they should be DTO properties.
                                    if (field.isOutput) {
                                        if (field.columnName.toLowerCase().includes('json')) {
                                            dtoColumn = `${accumulator.dto.length ? '\n\t' : ''}/**\n`;
                                            dtoColumn += `   * Property that represents ${field.columnName} as a JSON object in the SP.\n`;
                                            dtoColumn += `   * @property {object} ${columnName}\n`;
                                            dtoColumn += `   */\n`;
                                            dtoColumn += `  readonly ${columnName}?: object;`;
                                        }
                                        else {
                                            dtoColumn = `${accumulator.dto.length ? '\n\t' : ''}/**\n`;
                                            dtoColumn += `   * Property that represents ${field.columnName} in the SP.\n`;
                                            dtoColumn += `   * @property {${field.jsType}} ${columnName}\n`;
                                            dtoColumn += `   */\n`;
                                            dtoColumn += `  readonly ${columnName}?: ${field.jsType};`;
                                        }
                                        accumulator.dto.push(dtoColumn);
                                    }
                                    else {
                                        // They are interface properties.
                                        let propertyColumnName;
                                        propertyColumnName = `${accumulator.interface.length ? '\n\t' : ''}/**\n`;
                                        propertyColumnName += `   * Property that represents ${field.columnName} in the SP.\n`;
                                        propertyColumnName += `   * @property {${field.jsType}} ${columnName}\n`;
                                        propertyColumnName += `   */\n`;
                                        propertyColumnName += `  ${columnName}?: ${field.jsType};`;
                                        accumulator.interface.push(propertyColumnName);
                                    }
                                    return accumulator;
                                }, {
                                    interface: [],
                                    dto: [],
                                });
                                let interfaceFileContents;
                                interfaceFileContents = `/**\n`;
                                interfaceFileContents += ` * Interface that represents '${storedProcedureName}' Stored Procedure.\n`;
                                interfaceFileContents += ` *\n`;
                                interfaceFileContents += ` * @interface ${spName}\n`;
                                interfaceFileContents += ` * \n`;
                                interfaceFileContents += ` */\n`;
                                interfaceFileContents += `export interface ${interfaceName} {\n`;
                                interfaceFileContents += `  ${columns.interface.join('\r\n')}\n`;
                                interfaceFileContents += `}\n`;
                                fs.writeFileSync(`${dirSpInterfaces}/${interfaceFileName}.ts`, interfaceFileContents);
                                let dtoFileContents;
                                dtoFileContents = `/**\n`;
                                dtoFileContents += ` * Class that represents '${storedProcedureName}' Stored Procedure response.\n`;
                                dtoFileContents += ` *\n`;
                                dtoFileContents += ` * @class ${dtoName}\n`;
                                dtoFileContents += ` * \n`;
                                dtoFileContents += ` */\n`;
                                dtoFileContents += `export class ${dtoName} {\n`;
                                dtoFileContents += `  ${columns.dto.join('\r\n')}\n`;
                                dtoFileContents += `}\n`;
                                fs.writeFileSync(`${dirSpDtos}/${dtoFileName}.ts`, dtoFileContents);
                                let asyncGetStoredProcedure;
                                asyncGetStoredProcedure = `  /**\n`;
                                asyncGetStoredProcedure += `   * Executes '${storedProcedureName}' stored procedure\n`;
                                asyncGetStoredProcedure += `   * @param {SPInterfaces.${interfaceName}} params\n`;
                                asyncGetStoredProcedure += `   * @returns {SPDTOs.${dtoName}}\n`;
                                asyncGetStoredProcedure += `   */\n`;
                                asyncGetStoredProcedure += `  async get${spName}<T>(\n`;
                                asyncGetStoredProcedure += `    executeSP: Function,\n`;
                                asyncGetStoredProcedure += `    entityManager: T,\n`;
                                asyncGetStoredProcedure += `    params: SPInterfaces.${interfaceName}\n`;
                                asyncGetStoredProcedure += `  ): Promise<SPDTOs.${dtoName}[]> {\n`;
                                asyncGetStoredProcedure += `    const spName = '${storedProcedureName}';\n`;
                                asyncGetStoredProcedure += `  \n`;
                                asyncGetStoredProcedure += `    return executeSP(\n`;
                                asyncGetStoredProcedure += `      entityManager,\n`;
                                asyncGetStoredProcedure += `      spName,\n`;
                                asyncGetStoredProcedure += `      params,\n`;
                                asyncGetStoredProcedure += `      SPDTOs.${dtoName}\n`;
                                asyncGetStoredProcedure += `    );\n`;
                                asyncGetStoredProcedure += `  }\n`;
                                contentsMethods.push(asyncGetStoredProcedure);
                            });
                            let serviceContents;
                            serviceContents = `import * as SPInterfaces from './interfaces';\n`;
                            serviceContents += `import * as SPDTOs from './dtos';\n`;
                            serviceContents += `\n`;
                            serviceContents += `export class StoredProceduresService {\n`;
                            serviceContents += contentsMethods.join('\r\n');
                            serviceContents += '\r\n}';
                            fs.writeFileSync(`${dirSpInterfaces}/index.ts`, interfaceIndexContents.join(';\r\n'));
                            fs.writeFileSync(`${dirSpDtos}/index.ts`, dtoIndexContents.join(';\r\n'));
                            fs.writeFileSync(`${dirSp}/stored-procedures-service.ts`, serviceContents);
                        }
                    });
                }
            });
        }
    });
};
const generateStoreProcedures = async () => {
    try {
        const { RDS_TYPE, RDS_HOSTNAME, RDS_PORT, RDS_USERNAME, RDS_PASSWORD, RDS_DB_NAME, } = new environment_service_1.EnvironmentService().getEnvs();
        const connection = await typeorm_1.createConnection({
            type: RDS_TYPE,
            host: RDS_HOSTNAME,
            port: RDS_PORT,
            username: RDS_USERNAME,
            password: RDS_PASSWORD,
            database: RDS_DB_NAME,
        });
        const storedProcedureSchema = await connection.query(`
      SELECT schema_name(procedures.schema_id) as schemaName,
        object_name(parameters.object_id) as storedProcedureName,
        parameters.name as columnName,
        type_name(user_type_id) as dataType,
        parameters.max_length as length,
        parameters.precision as precission,
        parameters.is_output as isOutput
      FROM sys.parameters parameters
      JOIN sys.procedures procedures
          ON procedures.object_id = parameters.object_id
      ORDER BY schemaName, storedProcedureName, columnName
    `);
        const storedProcedures = parseStoredProcedures(storedProcedureSchema);
        generateInterfaceFiles(storedProcedures);
        console.log(`${helpers_1.projectTitle} - Stored Procedures generated successfully`);
        connection.close();
    }
    catch (err) {
        console.error(`${helpers_1.projectTitle} - ${err}`);
    }
};
generateStoreProcedures();
//# sourceMappingURL=generate-stored-procedures.js.map