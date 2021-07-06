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
const util = __importStar(require("util"));
const environment_service_1 = require("typeorm-model-generator/environment-service");
const helpers_1 = require("typeorm-model-generator/helpers");
// child_process = spawn subprocesses
// child_process.exec() = uses a shell to execute the command
// util.promisify() = returns a Promise for an Object with stdout and stderr properties
const exec = util.promisify(require('child_process').exec);
const generateEntities = async () => {
    console.log(`${helpers_1.projectTitle} - ${__filename}`);
    try {
        const { RDS_HOSTNAME, RDS_DB_NAME, RDS_TYPE, RDS_PORT, RDS_USERNAME, RDS_PASSWORD, DIR_DATA, } = new environment_service_1.EnvironmentService().getEnvs();
        await exec(`typeorm-model-generator -h ${RDS_HOSTNAME} -d ${RDS_DB_NAME} -e ${RDS_TYPE} -p ${RDS_PORT} -u ${RDS_USERNAME} -x ${RDS_PASSWORD} -o ${DIR_DATA}`, (error, stdout, stderr) => {
            if (error) {
                throw error;
            }
            console.log(`${helpers_1.projectTitle} - stdout: ${stdout}`);
            console.log(`${helpers_1.projectTitle} - stderr: ${stderr}`);
        });
    }
    catch (err) {
        console.error(`${helpers_1.projectTitle} - err ${err}`);
    }
};
generateEntities();
//# sourceMappingURL=generate-entities.js.map