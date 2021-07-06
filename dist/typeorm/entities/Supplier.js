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
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
let Supplier = class Supplier {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "ID" }),
    __metadata("design:type", Number)
], Supplier.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "companyName", length: 40, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contactName", length: 30, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "contactName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contactTitle", length: 30, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "contactTitle", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contactTitle", length: 30, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "address", length: 60, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "city", length: 15, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "region", length: 15, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "region", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "country", length: 15, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "postalCode", length: 10, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "postalCode", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "phone", length: 24, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "fax", length: 24, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "fax", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "homePage", length: 10, default: () => null }),
    __metadata("design:type", String)
], Supplier.prototype, "homePage", void 0);
Supplier = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("suppliers", { schema: "dbo" })
], Supplier);
exports.Supplier = Supplier;
//# sourceMappingURL=Supplier.js.map