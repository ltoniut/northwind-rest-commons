import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { camelize } from './helpers';

const newModels = async (): Promise<void> => {
  const indexFile = fs.createWriteStream(path.join(__dirname, '/../typeorm/entities/index.ts'));

  fs.readdir(path.join(__dirname, '/../typeorm/entities'), (err, files) => {
    files.forEach(async (file) => {
      const oldFilePath = path.join(__dirname, '/../typeorm/entities/' + file);
      const newFilePath = path.join(__dirname, '/../models/' + file);
      const modelBuilderFilePath = path.join(__dirname, '/../schemas/model-builders/' + file.toLowerCase());

      const entityName = file.substring(0, file.length - 3);

      if(entityName !== 'index') {
        indexFile.write(`export * from './${ entityName }';\n`);
      }

      const readable = await fs.createReadStream(oldFilePath);

      const newFileLines: string[] = [];
      const modelBuilderFileLines: string[] = [];

      const rl = readline.createInterface({
        input: readable,
        crlfDelay: Infinity
      });

      let nameSeparate = false;
      let dbType = '';
      let tsType = '';
      let entityDbName = '';
      let columnName = '';
      let deleteNextParenthSemi = true;

      for await (const line of rl) {
        if(entityName !== 'index') {
          if(line.startsWith('@Entity')) {
            const lineVariables = line.split('"');
            entityDbName = lineVariables[1];
          }
          if (!line.startsWith('@') && !line.includes('import') && !line.includes('default')){
            if(line.includes('@PrimaryGeneratedColumn')) {
              modelBuilderFileLines.push(`  .index('id', ['id'], { unique: true })`);
              deleteNextParenthSemi = false;
              const lineVariables = line.split('"');
              tsType = translateDbType(lineVariables[1]);
              if (lineVariables.length < 4) {
                nameSeparate = true;
              }
              else {
                const columnName = lineVariables[3];
                const extraVariables = line.split(',').slice(2).join(',');
                let newLine = `  .column('${camelize(columnName)}', '${tsType}', { type: '${lineVariables[1]}', name: '${columnName}'`;
                if (extraVariables) {
                  newLine += `, ${extraVariables}`;
                } else {
                  newLine += `})`;
                }
                modelBuilderFileLines.push(newLine);
              }
            }
            else if(line.includes('@Column')) {
              const lineVariables = line.split('"');
              tsType = translateDbType(lineVariables[1]);
              if (lineVariables.length < 4) {
                nameSeparate = true;
                dbType = lineVariables[1];
                tsType = translateDbType(dbType);
              }
              else {
                const columnName = lineVariables[3];
                const expectedNumber = line.includes('primary:') ? 3 : 2;
                if (line.includes('primary:')) deleteNextParenthSemi = false;

                const extraVariables = line.split(',').slice(expectedNumber).join(',');
                let newLine = `  .column('${camelize(columnName)}', '${tsType}', { type: '${lineVariables[1]}', name: '${columnName}'`;
                if (extraVariables) {
                  newLine += `, ${extraVariables}`;
                } else {
                  newLine += `})`;
                }

                modelBuilderFileLines.push(newLine);
              }
            }
            else if(line.includes('@JoinColumn')) {
              const lineVariables = line.split('"');
              if (lineVariables.length < 4) {
                nameSeparate = true;
                columnName = lineVariables[1];
              }
              else {
                const columnName = lineVariables[1];
                const extraVariables = line.split(',').slice(2).join(',');
                let newLine = `  .column('${camelize(columnName)}', 'number', { type: 'int', name: '${columnName}'`;
                if (extraVariables) {
                  newLine += `, ${extraVariables}`;
                } else {
                  newLine += `})`;
                }
  
                modelBuilderFileLines.push(newLine);
              }
            }
            // Se ignoran las líneas vinculadas a las relaciones, y se indica que se debe ignorar el próximo cierre
            else if (line.includes('onDelete') || line.includes('onUpdate')) {
              deleteNextParenthSemi = true;
            }
            // Si el nombre de la entidad no se encuentra en la misma línea de su declaración, se manejan los datos con la siguiente línea
            else if (nameSeparate) {
              const lineVariables = line.split('"');
              columnName = lineVariables[1];
              modelBuilderFileLines.push(`  .column('${camelize(columnName)}', '${tsType}', {`);
              modelBuilderFileLines.push(`    type: '${dbType}',`);
              modelBuilderFileLines.push(`    name: '${columnName}',`);
              nameSeparate = false;
              dbType = '';
              columnName = '';
            }
            // Si la línea incluye }), dependiendo del contexto se debe o no incluir
            else if (line.includes('})')) {
              if (deleteNextParenthSemi) { 
                deleteNextParenthSemi = false;
              }
              else modelBuilderFileLines.push(line);
            }
            // Incluir sólamente los parámetros adicionales
            else if ((line.includes(';') ||
             line.includes('export') ||
             line === '}') &&
             !line.includes('@') &&
             !line.includes('[]') &&
             !line.includes('from') && !line.includes('  | ')) {
              const lineVariables = line.split(':');
              if (lineVariables.length > 1) {
              const name = lineVariables[0].slice(2);
              const type = lineVariables[1].slice(1,-1);
              if (files.includes(`${type}.ts`) || files.includes(`${type}[].ts`)) {
                
              }
              else {
                newFileLines.push(line);
              }
            }
              else {
                newFileLines.push(line);
              }
            }
          }
        }
      }
      

      fs.writeFile(newFilePath, '', () => { });
      const newFile = fs.createWriteStream(newFilePath);
      newFile.on('error', function (err) { });
      newFileLines.forEach(function (v) {
        newFile.write(v + '\n'); 
      });
      const modelBuilderFile = fs.createWriteStream(modelBuilderFilePath);

      modelBuilderFile.write(`import { ModelBuilder } from '@src/schemas/model-builder';\n`);
      modelBuilderFile.write(`export default ModelBuilder.create('${entityName}', { schema: 'dbo', sqlName: '${entityDbName}',})\n`);
      modelBuilderFile.on('error', function (err) { });
      modelBuilderFileLines.forEach(function (v) {
        modelBuilderFile.write(v + '\n'); 
      });
      modelBuilderFile.write('.build();')
      newFile.end();
      modelBuilderFile.end();
      indexFile.end();
    });
  });
}

const translateDbType = (input: string): string => {
  if (input.toLowerCase().includes('int') ||
   input.toLowerCase().includes('bit') ||
   input.toLowerCase().includes('double') ||
   input.toLowerCase().includes('decimal') ||
    input.toLowerCase().includes('year')) {
    return 'number';
  }
  if (input.toLowerCase().includes('char') ||
  input.toLowerCase().includes('text') ||
  input.toLowerCase().includes('enum') ||
  input.toLowerCase().includes('set') ||
  input.toLowerCase().includes('geometry') ||
  input.toLowerCase().includes('blob')) {
    return 'string';
  }
  if (input.toLowerCase().includes('date') ||
    input.toLowerCase().includes('time')) {
    return 'Date';
  }
  if (input.toLowerCase().includes('bool')) {
    return 'boolean';
  }

  return input;
}

newModels();