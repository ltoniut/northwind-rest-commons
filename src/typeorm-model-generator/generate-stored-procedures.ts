import * as fs from 'fs';
import { createConnection, Connection } from 'typeorm';
import {
  projectTitle,
  camelize,
  camelizeCapitalized,
  sqlServerToJSTypes,
} from 'typeorm-model-generator/helpers';
import { EnvironmentService } from 'typeorm-model-generator/environment-service';

const SP_REGEX = /sp_|usp_/gi;

const parseSPName = (name: string): string => {
  return name.toLowerCase().replace(SP_REGEX, '');
};

const parseStoredProcedures = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  storedProcedureSchema: Array<object>,
  // eslint-disable-next-line @typescript-eslint/ban-types
): object => {
  return storedProcedureSchema.reduce((
    // eslint-disable-next-line @typescript-eslint/ban-types
    accumulator: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
  ) => {
    const key = item.storedProcedureName;
    const storedProcedureNameNormalized = camelizeCapitalized(parseSPName(key));
    const columnNameNormalized = camelize(
      item.columnName.toLowerCase().replace(/@/gi, ''),
    );
    const storedProcedureItem = {
      ...item,
      jsType: sqlServerToJSTypes[item.dataType],
      columnNameNormalized,
      storedProcedureNameNormalized,
    };

    if (accumulator[key]) {
      accumulator[key].push(storedProcedureItem);
    } else {
      accumulator[key] = [storedProcedureItem];
    }

    return accumulator;
  }, {});
};

const generateInterfaceFiles = (storedProcedures): void => {
  const dirSp = 'src/typeorm/stored-procedures';
  const dirSpInterfaces = 'src/typeorm/stored-procedures/interfaces';
  const dirSpDtos = 'src/typeorm/stored-procedures/dtos';

  fs.mkdir(dirSp, { recursive: true }, err => {
    if (err) {
      console.error(`${projectTitle} - ${err}`);
    } else {
      fs.mkdir(dirSpInterfaces, { recursive: true }, err => {
        if (err) {
          console.error(`${projectTitle} - ${err}`);
        } else {
          fs.mkdir(dirSpDtos, { recursive: true }, err => {
            if (err) {
              console.error(`${projectTitle} - ${err}`);
            } else {
              const contentsMethods: Array<string> = [];
              const interfaceIndexContents: string[] = [];
              const dtoIndexContents: string[] = [];

              Object.keys(storedProcedures).forEach(
                (storedProcedureName: string) => {
                  const fields = storedProcedures[storedProcedureName];
                  const spName = fields[0].storedProcedureNameNormalized;
                  const fileName = `${storedProcedureName
                    .replace(/sp_|usp_/gi, '')
                    .toLowerCase()}`;
                  const interfaceName = `${spName}Params`;
                  const dtoName = `${spName}SPDTO`;
                  const interfaceFileName = `${fileName}.interface`;
                  const dtoFileName = `${fileName}.dto`;
                  let dtoColumn: string | null = null;

                  let cmdInterfaceFileName: string;
                  cmdInterfaceFileName = `export type {\n`;
                  cmdInterfaceFileName += `  ${interfaceName}\n`;
                  cmdInterfaceFileName += `} from './${interfaceFileName}'`;
                  interfaceIndexContents.push(cmdInterfaceFileName);

                  let cmdDtoFileName: string;
                  cmdDtoFileName = `export {\n`;
                  cmdDtoFileName += `  ${dtoName}\n`;
                  cmdDtoFileName += `} from './${dtoFileName}'`;
                  dtoIndexContents.push(cmdDtoFileName);

                  const columns = fields.reduce(
                    (accumulator, field) => {
                      const columnName = camelize(field.columnNameNormalized);

                      // @out params are responses from the SP so they should be DTO properties.
                      if (field.isOutput) {
                        if (field.columnName.toLowerCase().includes('json')) {
                          dtoColumn = `${
                            accumulator.dto.length ? '\n\t' : ''
                          }/**\n`;
                          dtoColumn += `   * Property that represents ${field.columnName} as a JSON object in the SP.\n`;
                          dtoColumn += `   * @property {object} ${columnName}\n`;
                          dtoColumn += `   */\n`;
                          dtoColumn += `  readonly ${columnName}?: object;`;
                        } else {
                          dtoColumn = `${
                            accumulator.dto.length ? '\n\t' : ''
                          }/**\n`;
                          dtoColumn += `   * Property that represents ${field.columnName} in the SP.\n`;
                          dtoColumn += `   * @property {${field.jsType}} ${columnName}\n`;
                          dtoColumn += `   */\n`;
                          dtoColumn += `  readonly ${columnName}?: ${field.jsType};`;
                        }
                        accumulator.dto.push(dtoColumn);
                      } else {
                        // They are interface properties.
                        let propertyColumnName: string;
                        propertyColumnName = `${
                          accumulator.interface.length ? '\n\t' : ''
                        }/**\n`;
                        propertyColumnName += `   * Property that represents ${field.columnName} in the SP.\n`;
                        propertyColumnName += `   * @property {${field.jsType}} ${columnName}\n`;
                        propertyColumnName += `   */\n`;
                        propertyColumnName += `  ${columnName}?: ${field.jsType};`;
                        accumulator.interface.push(propertyColumnName);
                      }

                      return accumulator;
                    },
                    {
                      interface: [],
                      dto: [],
                    },
                  );

                  let interfaceFileContents: string;
                  interfaceFileContents = `/**\n`;
                  interfaceFileContents += ` * Interface that represents '${storedProcedureName}' Stored Procedure.\n`;
                  interfaceFileContents += ` *\n`;
                  interfaceFileContents += ` * @interface ${spName}\n`;
                  interfaceFileContents += ` * \n`;
                  interfaceFileContents += ` */\n`;
                  interfaceFileContents += `export interface ${interfaceName} {\n`;
                  interfaceFileContents += `  ${columns.interface.join(
                    '\r\n',
                  )}\n`;
                  interfaceFileContents += `}\n`;

                  fs.writeFileSync(
                    `${dirSpInterfaces}/${interfaceFileName}.ts`,
                    interfaceFileContents,
                  );

                  let dtoFileContents: string;
                  dtoFileContents = `/**\n`;
                  dtoFileContents += ` * Class that represents '${storedProcedureName}' Stored Procedure response.\n`;
                  dtoFileContents += ` *\n`;
                  dtoFileContents += ` * @class ${dtoName}\n`;
                  dtoFileContents += ` * \n`;
                  dtoFileContents += ` */\n`;
                  dtoFileContents += `export class ${dtoName} {\n`;
                  dtoFileContents += `  ${columns.dto.join('\r\n')}\n`;
                  dtoFileContents += `}\n`;

                  fs.writeFileSync(
                    `${dirSpDtos}/${dtoFileName}.ts`,
                    dtoFileContents,
                  );

                  let asyncGetStoredProcedure: string;
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
                },
              );

              let serviceContents: string;
              serviceContents = `import * as SPInterfaces from './interfaces';\n`;
              serviceContents += `import * as SPDTOs from './dtos';\n`;
              serviceContents += `\n`;
              serviceContents += `export class StoredProceduresService {\n`;
              serviceContents += contentsMethods.join('\r\n');
              serviceContents += '\r\n}';

              fs.writeFileSync(
                `${dirSpInterfaces}/index.ts`,
                interfaceIndexContents.join(';\r\n'),
              );
              fs.writeFileSync(
                `${dirSpDtos}/index.ts`,
                dtoIndexContents.join(';\r\n'),
              );
              fs.writeFileSync(
                `${dirSp}/stored-procedures-service.ts`,
                serviceContents,
              );
            }
          });
        }
      });
    }
  });
};

const generateStoreProcedures = async (): Promise<void> => {
  try {
    const {
      RDS_TYPE,
      RDS_HOSTNAME,
      RDS_PORT,
      RDS_USERNAME,
      RDS_PASSWORD,
      RDS_DB_NAME,
    } = new EnvironmentService().getEnvs();

    const connection: Connection = await createConnection({
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

    console.log(`${projectTitle} - Stored Procedures generated successfully`);

    connection.close();
  } catch (err) {
    console.error(`${projectTitle} - ${err}`);
  }
};

generateStoreProcedures();
