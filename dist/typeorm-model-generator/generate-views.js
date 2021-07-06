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
// eslint-disable-next-line @typescript-eslint/ban-types
const parseViews = (viewSchema) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return viewSchema.reduce((
    // eslint-disable-next-line @typescript-eslint/ban-types
    accumulator, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item) => {
        const key = item.viewName;
        const viewItem = Object.assign(Object.assign({}, item), { jsType: helpers_1.sqlServerToJSTypes[item.dataType] });
        if (accumulator[key]) {
            accumulator[key].push(viewItem);
        }
        else {
            accumulator[key] = [viewItem];
        }
        return accumulator;
    }, {});
};
const generateInterfaceFiles = (views) => {
    const dirViews = 'src/typeorm/views';
    const dirViewsEntities = 'src/typeorm/views/view-entities';
    const dirViewsDtos = 'src/typeorm/views/dtos';
    fs.mkdir(dirViews, { recursive: true }, err => {
        if (err) {
            console.error(`${helpers_1.projectTitle} - ${err}`);
        }
        else {
            fs.mkdir(dirViewsEntities, { recursive: true }, err => {
                if (err) {
                    console.error(`${helpers_1.projectTitle} - ${err}`);
                }
                else {
                    fs.mkdir(dirViewsDtos, { recursive: true }, err => {
                        if (err) {
                            console.error(`${helpers_1.projectTitle} - ${err}`);
                        }
                        else {
                            const contentsImport = [];
                            const contentsMethods = [];
                            Object.keys(views).forEach((viewName) => {
                                const fields = views[viewName];
                                const dtoBaseName = helpers_1.camelizeCapitalized(viewName.replace(/\./g, '').toLowerCase().replace('view', ''));
                                const fileName = `${dtoBaseName.toLowerCase()}.dto`;
                                const dtoName = `${dtoBaseName}ViewDTO`;
                                const viewEntityName = `${dtoBaseName}ViewEntity`;
                                const viewEntityFileName = `${dtoBaseName.toLowerCase()}.view-entity`;
                                let dtoFileContents;
                                // TODO: should we keep it as clean DTOs or couple it to other libraries
                                // dtoFileContents = `import { Exclude, Expose } from 'class-transformer';\n`;
                                // dtoFileContents += `\n`;
                                // dtoFileContents += `@Exclude()\n`;
                                // dtoFileContents += `export class ${dtoName} {\n`;
                                dtoFileContents = `export class ${dtoName} {\n`;
                                const viewEntityFields = [];
                                fields.map(field => {
                                    const columnName = helpers_1.camelize(field.columnName.toLowerCase());
                                    // TODO: should we keep it as clean DTOs or couple it to other libraries
                                    // dtoFileContents += `  @Expose()\n`;
                                    dtoFileContents += `  ${columnName}: ${field.jsType};\r\n`;
                                    // TODO: should we keep it as clean DTOs or couple it to other libraries
                                    // let viewColumn: string;
                                    // viewColumn = `${
                                    //   viewEntityFields.length ? '  ' : ''
                                    // }@ViewColumn()\n`;
                                    // viewColumn += `  ${field.columnName}: ${field.jsType};`;
                                    const viewColumn = `${viewEntityFields.length ? '  ' : ''}${field.columnName}: ${field.jsType};`;
                                    viewEntityFields.push(viewColumn);
                                    return field;
                                });
                                dtoFileContents += '}\r\n';
                                fs.writeFileSync(`${dirViewsDtos}/${fileName}.ts`, dtoFileContents);
                                let cmdViewEntityFileContents;
                                // TODO: should we keep it as clean DTOs or couple it to other libraries
                                // cmdViewEntityFileContents = `import { ViewEntity, ViewColumn } from 'typeorm';\n`;
                                // cmdViewEntityFileContents += `\n`;
                                // cmdViewEntityFileContents += `@ViewEntity({\n`;
                                // cmdViewEntityFileContents += `  name: '${viewName}',\n`;
                                // cmdViewEntityFileContents += `})\n`;
                                // cmdViewEntityFileContents += `export class ${viewEntityName} {\n`;
                                cmdViewEntityFileContents = `export class ${viewEntityName} {\n`;
                                cmdViewEntityFileContents += `  ${viewEntityFields.join('\r\n')}\n`;
                                cmdViewEntityFileContents += `}\n`;
                                const viewEntityFileContents = cmdViewEntityFileContents;
                                fs.writeFileSync(`${dirViewsEntities}/${viewEntityFileName}.ts`, viewEntityFileContents);
                                contentsImport.push(`import { ${dtoName} } from './dtos/${fileName}';`);
                                contentsImport.push(`import { ${viewEntityName} } from './view-entities/${viewEntityFileName}';`);
                                let cmdContentsMethods;
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
                            let serviceContents;
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
const generateViews = async () => {
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
        console.log(`${helpers_1.projectTitle} - Views generated successfully`);
        connection.close();
    }
    catch (err) {
        console.error(`${helpers_1.projectTitle} - ${err}`);
    }
};
generateViews();
//# sourceMappingURL=generate-views.js.map