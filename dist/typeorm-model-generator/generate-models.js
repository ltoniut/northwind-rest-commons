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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
const newModels = async () => {
    const indexFile = fs.createWriteStream(path.join(__dirname, '/../typeorm/entities/index.ts'));
    fs.readdir(path.join(__dirname, '/../typeorm/entities'), (err, files) => {
        files.forEach(async (file) => {
            var e_1, _a;
            const oldFilePath = path.join(__dirname, '/../typeorm/entities/' + file);
            const newFilePath = path.join(__dirname, '/../models/' + file);
            const modelBuilderFilePath = path.join(__dirname, '/../schemas/model-builders/' + file.toLowerCase());
            const entityName = file.substring(0, file.length - 3);
            if (entityName !== 'index') {
                indexFile.write(`export * from './${entityName}';\n`);
            }
            const readable = await fs.createReadStream(oldFilePath);
            const newFileLines = [];
            const modelBuilderFileLines = [];
            const rl = readline.createInterface({
                input: readable,
                crlfDelay: Infinity
            });
            let nameSeparate = false;
            let dbType = '';
            let tsType = '';
            let entityDbName = '';
            let columnName = '';
            try {
                for (var rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = await rl_1.next(), !rl_1_1.done;) {
                    const line = rl_1_1.value;
                    if (entityName !== 'index') {
                        if (line.startsWith('@Entity')) {
                            const lineVariables = line.split('"');
                            entityDbName = lineVariables[1];
                        }
                        if (!line.startsWith('@') && !line.includes('import') && !line.includes('default')) {
                            if (line.includes('@PrimaryGeneratedColumn')) {
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
                                    }
                                    else {
                                        newLine += `})`;
                                    }
                                    modelBuilderFileLines.push(newLine);
                                }
                            }
                            else if (line.includes('@Column')) {
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
                                    }
                                    else {
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (rl_1_1 && !rl_1_1.done && (_a = rl_1.return)) await _a.call(rl_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            fs.writeFile(newFilePath, '', () => { });
            const newFile = fs.createWriteStream(newFilePath);
            newFile.on('error', function (err) { });
            newFileLines.forEach(function (v) {
                newFile.write(v);
            });
            const modelBuilderFile = fs.createWriteStream(modelBuilderFilePath);
            modelBuilderFile.write(`import { ModelBuilder } from '../schemas/model-builder';\n`);
            modelBuilderFile.write(`export default ModelBuilder.create('${entityName}', { schema: 'dbo', sqlName: '${entityDbName}',})\n`);
            modelBuilderFile.on('error', function (err) { });
            modelBuilderFileLines.forEach(function (v) {
                modelBuilderFile.write(v + '\n');
            });
            modelBuilderFile.write('.build();');
            newFile.end();
            modelBuilderFile.end();
            indexFile.end();
        });
    });
};
const translateDbType = (input) => {
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
};
newModels();
//# sourceMappingURL=generate-models.js.map