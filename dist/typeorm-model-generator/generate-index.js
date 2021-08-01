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
const path = __importStar(require("path"));
const generateIndex = async () => {
    fs.readdir(path.join(__dirname, '/../typeorm/entities'), (err, files) => {
        fs.unlinkSync(path.join(__dirname, '/../schemas/model-builders/index.ts'));
        fs.unlinkSync(path.join(__dirname, '/../models/index.ts'));
        const modulesFile = fs.createWriteStream(path.join(__dirname, '/../../.module-variables'));
        const indexBuilderFile = fs.createWriteStream(path.join(__dirname, '/../schemas/model-builders/index.ts'));
        const names = [];
        files.forEach((name) => {
            if (name !== 'index.ts')
                names.push(name.substring(0, name.length - 3));
        });
        indexBuilderFile.write(`import { Model } from 'schemas/model';\n\n`);
        names.forEach((name) => {
            modulesFile.write(`import { ${name}Module } from './modules/${name.toLowerCase()}/module';\n`);
            indexBuilderFile.write(`import ${name} from './${name.toLowerCase()}';\n`);
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
        indexBuilderFile.end();
        modulesFile.end();
    });
};
generateIndex();
//# sourceMappingURL=generate-index.js.map