import * as fs from 'fs';
import * as path from 'path';

const generateIndex = async (): Promise<void> => {
  fs.readdir(path.join(__dirname, '/../typeorm/entities'), (err, files) => {
    fs.unlinkSync(path.join(__dirname, '/../schemas/model-builders/index.ts'));
    fs.unlinkSync(path.join(__dirname, '/../models/index.ts'));
    fs.unlinkSync(path.join(__dirname, '/../models/.empty'));

    const modulesFile = fs.createWriteStream(path.join(__dirname, '/../../.module-variables'));
    const indexBuilderFile = fs.createWriteStream(path.join(__dirname, '/../schemas/model-builders/index.ts'));
    const entitiesFile = fs.createWriteStream(path.join(__dirname, '/../../entities.json'));
    const names = [];

    files.forEach((name) => {
      if (name !== 'index.ts') names.push(name.substring(0, name.length - 3));
    });
    indexBuilderFile.write(`import { Model } from 'schemas/model';\n\n`);
    entitiesFile.write(`{\n  "entities": [\n`);
    names.forEach((name) => {
      modulesFile.write(`import { ${name}Module } from './modules/${name.toLowerCase()}/module';\n`)
      indexBuilderFile.write(`import ${name} from './${name.toLowerCase()}';\n`);
      entitiesFile.write(`    {\n      "name": "${ name }"\n    },\n`)
    });

    indexBuilderFile.write(`\nconst schemas: Model[] = [\n`);
    modulesFile.write(`\n\n\n`);

    names.forEach((name) => {
      indexBuilderFile.write(`  ${name},\n`);
      modulesFile.write(`    ${name}Module,\n`);
    });
    indexBuilderFile.write(`];\n\n`);
    indexBuilderFile.write(`export function loadSchemas(): void {\n`);
    indexBuilderFile.write(`  console.log(\`Loading \${schemas.length} modules\`);\n}\n`);
    indexBuilderFile.write(`export default schemas;`);
    entitiesFile.write(`  ]\n}`);

    indexBuilderFile.end();
    entitiesFile.end();
    modulesFile.end();
    });
}

generateIndex();