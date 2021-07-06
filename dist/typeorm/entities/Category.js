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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
let Category = class Category {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "categoryName", length: 15, default: () => null }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "description", default: () => null }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("longblob", { name: "picture", default: () => null }),
    __metadata("design:type", String)
], Category.prototype, "picture", void 0);
Category = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("categories", { schema: "dbo" })
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map