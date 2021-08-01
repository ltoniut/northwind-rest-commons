import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

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

      for await (const line of rl) {
        if(entityName !== 'index') {
          if(line.startsWith('@Entity')) {
            const lineVariables = line.split('"');
            entityDbName = lineVariables[1];
          }
          if (!line.startsWith('@') && !line.includes('import') && !line.includes('default')){
            if(line.includes('@PrimaryGeneratedColumn')) {
              modelBuilderFileLines.push(`  .index('id', ['id'], { unique: true })`);
              const lineVariables = line.split('"');
              tsType = translateDbType(lineVariables[1]);
              if (lineVariables.length < 4) {
                nameSeparate = true;
              }
              else {
                const columnName = lineVariables[3];
                const extraVariables = line.split(',').slice(2).join(',');
                let newLine = `  .column('${columnName}', '${tsType}', { type: '${lineVariables[1]}', name: '${columnName}'`;
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
                columnName = lineVariables[3];
              }
              else {
                const columnName = lineVariables[3];
                const extraVariables = line.split(',').slice(2).join(',');
                let newLine = `  .column('${columnName}', '${tsType}', { type: '${lineVariables[1]}', name: '${columnName}'`;
                if (extraVariables) {
                  newLine += `, ${extraVariables}`;
                } else {
                  newLine += `})`;
                }

                modelBuilderFileLines.push(newLine);
              }
              //.index('id', ['id'], { unique: true })
              // cambiar @Column o @PrimaryColumn por .column
            }
            else if (nameSeparate) {
              modelBuilderFileLines.push(`  .column('${columnName}', '${tsType}', {`);
              modelBuilderFileLines.push(`    type: '${dbType}',`);
              modelBuilderFileLines.push(`    name: '${columnName}',`);
              nameSeparate = false;
              dbType = '';
              columnName = '';
            }
            else if (line.startsWith('    ') || line.includes('})')) {
              modelBuilderFileLines.push(line);
            }
            else {
              newFileLines.push(line);
            }
          }
        }
      }

      fs.writeFile(newFilePath, '', () => { });
      const newFile = fs.createWriteStream(newFilePath);
      newFile.on('error', function (err) { });
      newFileLines.forEach(function (v) {
        newFile.write(v); 
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
    input.toLowerCase().includes('decimal')) {
    return 'number';
  }
  if (input.toLowerCase().includes('char') ||
  input.toLowerCase().includes('text') ||
  input.toLowerCase().includes('blob')) {
    return 'string';
  }
  if (input.toLowerCase().includes('date')) {
    return 'Date';
  }
  if (input.toLowerCase().includes('bool')) {
    return 'boolean';
  }

  return input;
}

newModels();