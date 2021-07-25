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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
let Customer = class Customer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "internalId", length: 5, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "internalId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "companyName", length: 20, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contactName", length: 30, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "contactName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "contactTitle", length: 30, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "contactTitle", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "address", length: 60, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "city", length: 15, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "country", length: 15, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "phone", length: 24, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "fax", length: 24, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "fax", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "postalCode", length: 10, default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "postalCode", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "image", default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "image", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "imageThumbnail", default: () => null }),
    __metadata("design:type", String)
], Customer.prototype, "imageThumbnail", void 0);
Customer = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("customers", { schema: "dbo" })
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map