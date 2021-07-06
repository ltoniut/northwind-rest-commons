"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemas = void 0;
const category_1 = __importDefault(require("./category"));
const customer_1 = __importDefault(require("./customer"));
const employee_1 = __importDefault(require("./employee"));
const order_1 = __importDefault(require("./order"));
const orderdetails_1 = __importDefault(require("./orderdetails"));
const product_1 = __importDefault(require("./product"));
const shipper_1 = __importDefault(require("./shipper"));
const supplier_1 = __importDefault(require("./supplier"));
const schemas = [
    category_1.default,
    customer_1.default,
    employee_1.default,
    order_1.default,
    orderdetails_1.default,
    product_1.default,
    shipper_1.default,
    supplier_1.default,
];
function loadSchemas() {
    console.log(`Loading ${schemas.length} modules`);
}
exports.loadSchemas = loadSchemas;
exports.default = schemas;
//# sourceMappingURL=index.js.map