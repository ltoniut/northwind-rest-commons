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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "productName", length: 40, default: () => "space((1))" }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    typeorm_1.Column("int", { name: "customerID", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "customerId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "categoryID", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "quantityPerUnit", length: 20, default: () => null }),
    __metadata("design:type", String)
], Product.prototype, "quantityPerUnit", void 0);
__decorate([
    typeorm_1.Column("decimal", { name: "unitPrice", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
__decorate([
    typeorm_1.Column("int", { name: "unitsInStock", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "unitsInStock", void 0);
__decorate([
    typeorm_1.Column("int", { name: "unitsOnOrder", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "unitsOnOrder", void 0);
__decorate([
    typeorm_1.Column("int", { name: "reorderLevel", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "reorderLevel", void 0);
__decorate([
    typeorm_1.Column("tinyint", { name: "discontinued", default: () => null }),
    __metadata("design:type", Number)
], Product.prototype, "discontinued", void 0);
Product = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("products", { schema: "dbo" })
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map