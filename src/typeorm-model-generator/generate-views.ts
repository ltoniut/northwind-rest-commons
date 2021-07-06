import * as fs from 'fs';
import { createConnection, Connection } from 'typeorm';
import {
  projectTitle,
  camelize,
  camelizeCapitalized,
  sqlServerToJSTypes,
} from 'typeorm-model-generator/helpers';
import { EnvironmentService } from 'typeorm-model-generator/environment-service';

// eslint-disable-next-line @typescript-eslint/ban-types
const parseViews = (viewSchema: Array<object>): object => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return viewSchema.reduce((
    // eslint-disable-next-line @typescript-eslint/ban-types
    accumulator: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
  ) => {
    const key = item.viewName;
    const viewItem = {
      ...item,
      jsType: sqlServerToJSTypes[item.dataType],
    };

    if (accumulator[key]) {
      accumulator[key].push(viewItem);
    } else {
      accumulator[key] = [viewItem];
    }

    return accumulator;
  }, {});
};

const generateInterfaceFiles = (views): void => {
  const dirViews = 'src/typeorm/views';
  const dirViewsEntities = 'src/typeorm/views/view-entities';
  const dirViewsDtos = 'src/typeorm/views/dtos';

  fs.mkdir(dirViews, { recursive: true }, err => {
    if (err) {
      console.error(`${projectTitle} - ${err}`);
    } else {
      fs.mkdir(dirViewsEntities, { recursive: true }, err => {
        if (err) {
          console.error(`${projectTitle} - ${err}`);
        } else {
          fs.mkdir(dirViewsDtos, { recursive: true }, err => {
            if (err) {
              console.error(`${projectTitle} - ${err}`);
            } else {
              const contentsImport: Array<string> = [];
              const contentsMethods: Array<string> = [];

              Object.keys(views).forEach((viewName: string) => {
                const fields = views[viewName];
                const dtoBaseName = camelizeCapitalized(
                  viewName.replace(/\./g, '').toLowerCase().replace('view', ''),
                );
                const fileName = `${dtoBaseName.toLowerCase()}.dto`;
                const dtoName = `${dtoBaseName}ViewDTO`;
                const viewEntityName = `${dtoBaseName}ViewEntity`;
                const viewEntityFileName = `${dtoBaseName.toLowerCase()}.view-entity`;

                let dtoFileContents: string;
                // TODO: should we keep it as clean DTOs or couple it to other libraries
                // dtoFileContents = `import { Exclude, Expose } from 'class-transformer';\n`;
                // dtoFileContents += `\n`;
                // dtoFileContents += `@Exclude()\n`;
                // dtoFileContents += `export class ${dtoName} {\n`;
                dtoFileContents = `export class ${dtoName} {\n`;

                const viewEntityFields: Array<string> = [];

                fields.map(field => {
                  const columnName = camelize(field.columnName.toLowerCase());
                  // TODO: should we keep it as clean DTOs or couple it to other libraries
                  // dtoFileContents += `  @Expose()\n`;
                  dtoFileContents += `  ${columnName}: ${field.jsType};\r\n`;

                  // TODO: should we keep it as clean DTOs or couple it to other libraries
                  // let viewColumn: string;
                  // viewColumn = `${
                  //   viewEntityFields.length ? '  ' : ''
                  // }@ViewColumn()\n`;
                  // viewColumn += `  ${field.columnName}: ${field.jsType};`;
                  const viewColumn = `${viewEntityFields.length ? '  ' : ''}${
                    field.columnName
                  }: ${field.jsType};`;
                  viewEntityFields.push(viewColumn);

                  return field;
                });

                dtoFileContents += '}\r\n';

                fs.writeFileSync(
                  `${dirViewsDtos}/${fileName}.ts`,
                  dtoFileContents,
                );

                let cmdViewEntityFileContents: string;
                // TODO: should we keep it as clean DTOs or couple it to other libraries
                // cmdViewEntityFileContents = `import { ViewEntity, ViewColumn } from 'typeorm';\n`;
                // cmdViewEntityFileContents += `\n`;
                // cmdViewEntityFileContents += `@ViewEntity({\n`;
                // cmdViewEntityFileContents += `  name: '${viewName}',\n`;
                // cmdViewEntityFileContents += `})\n`;
                // cmdViewEntityFileContents += `export class ${viewEntityName} {\n`;
                cmdViewEntityFileContents = `export class ${viewEntityName} {\n`;
                cmdViewEntityFileContents += `  ${viewEntityFields.join(
                  '\r\n',
                )}\n`;
                cmdViewEntityFileContents += `}\n`;
                const viewEntityFileContents = cmdViewEntityFileContents;

                fs.writeFileSync(
                  `${dirViewsEntities}/${viewEntityFileName}.ts`,
                  viewEntityFileContents,
                );

                contentsImport.push(
                  `import { ${dtoName} } from './dtos/${fileName}';`,
                );
                contentsImport.push(
                  `import { ${viewEntityName} } from './view-entities/${viewEntityFileName}';`,
                );

                let cmdContentsMethods: string;
                cmdContentsMethods = `  async get${dtoBaseName}(\n`;
                cmdContentsMethods += `    filter: GetFilter,\n`;
                cmdContentsMethods += `    getRepository: Function\n`;
                cmdContentsMethods += `  ): Promise<${dtoName}[]> {\n`;
                cmdContentsMethods += `    const { limit, offset } = filter;\n`;
                cmdContentsMethods += `\n`;
                cmdContentsMethods += `    const data = await getRepository(${viewEntityName}).find({\n`;
                cmdContentsMethods += `      take: limit,\n`;
                cmdContentsMethods += `      skip: offset,\n`;
                cmdContentsMethods += `    });\n`;
                cmdContentsMethods += `\n`;
                cmdContentsMethods += `    if (!data.length) {\n`;
                // TODO: should we keep it as clean DTOs or couple it to other libraries
                // cmdContentsMethods += `      throw new NotFoundException(\`No data found at '${viewName}' view.\`);\n`;
                cmdContentsMethods += `      throw \`No data found at '${viewName}' view.\`;\n`;
                cmdContentsMethods += `    }\n`;
                cmdContentsMethods += `\n`;
                // TODO: should we keep it as clean DTOs or couple it to other libraries
                // cmdContentsMethods += `    return mapListToClass(${dtoName}, data);\n`;
                cmdContentsMethods += `    return data;\n`;
                cmdContentsMethods += `  }\n`;

                contentsMethods.push(cmdContentsMethods);
              });

              let serviceContents: string;
              // TODO: should we keep it as clean DTOs or couple it to other libraries
              // serviceContents = `import { mapListToClass } from '../../helpers/mapListToClass.helper';\n`;
              serviceContents = contentsImport.join('\r\n');
              serviceContents += `import { GetFilter } from '../../commons/GetFilter';\n`;
              // TODO: should we keep it as clean DTOs or couple it to other libraries
              // serviceContents += `import { GetFilterDTO } from '../../shared/dtos/filter-query';\n`;
              serviceContents += `\n`;
              // TODO: should we keep it as clean DTOs or couple it to other libraries
              // serviceContents += `@Injectable()\n`;
              serviceContents += `export class ViewsService {\n`;
              // TODO: should we keep it as clean DTOs or couple it to other libraries
              // serviceContents += `  constructor(private readonly manager: EntityManager = getManager()) {}\n`;
              serviceContents += contentsMethods.join('\r\n');
              serviceContents += '\r\n}';

              fs.writeFileSync(`${dirViews}/views-service.ts`, serviceContents);
            }
          });
        }
      });
    }
  });
};

const generateViews = async (): Promise<void> => {
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

    const viewSchema = await connection.query(`
      SELECT schema_name(v.schema_id) as schemaName,
        object_name(c.object_id) as viewName,
        c.column_id as columnId,
        c.name as columnName,
        type_name(user_type_id) as dataType,
        c.max_length as length,
        c.precision as precission
      FROM sys.columns c
      JOIN sys.views v 
        ON v.object_id = c.object_id
      ORDER BY schemaName, viewName, columnId;
    `);

    const views = parseViews(viewSchema);

    generateInterfaceFiles(views);

    console.log(`${projectTitle} - Views generated successfully`);

    connection.close();
  } catch (err) {
    console.error(`${projectTitle} - ${err}`);
  }
};

generateViews();
