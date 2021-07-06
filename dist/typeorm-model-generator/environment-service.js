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
exports.EnvironmentService = void 0;
const fs = __importStar(require("fs"));
const dotenv = __importStar(require("dotenv"));
const helpers_1 = require("typeorm-model-generator/helpers");
class EnvironmentService {
    constructor() {
        const environment = process.env.NODE_ENV || 'development';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let data = {};
        try {
            if (environment === 'development') {
                data = dotenv.parse(fs.readFileSync('.env'));
            }
            else {
                data = Object.assign(Object.assign({}, data), process.env);
            }
        }
        catch (e) {
            console.warn(`${helpers_1.projectTitle} - ${e}`);
        }
        data.APP_ENV = environment;
        data.RDS_PORT = parseInt(data.RDS_PORT);
        this.envs = data;
    }
    getEnvs() {
        return this.envs;
    }
}
exports.EnvironmentService = EnvironmentService;
//# sourceMappingURL=environment-service.js.map