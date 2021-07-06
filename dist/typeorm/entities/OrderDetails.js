"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const typeorm_1 = require("typeorm");
let OrderDetails = class OrderDetails {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("int", { name: "supplierID", default: () => null }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "supplierId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "categoryID", default: () => null }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "quantityPerUnit" }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantityPerUnit", void 0);
__decorate([
    typeorm_1.Column("int", { name: "unitPrice" }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "unitPrice", void 0);
__decorate([
    typeorm_1.Column("int", { name: "quantity", default: 0 }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column("decimal", { name: "discount", default: 0 }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "discount", void 0);
OrderDetails = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("order details", { schema: "dbo" })
], OrderDetails);
exports.OrderDetails = OrderDetails;
//# sourceMappingURL=OrderDetails.js.map