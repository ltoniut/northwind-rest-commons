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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
let Employee = class Employee {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "lastName", length: 20, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "firstName", length: 10, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "title", length: 30, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "title", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "titleOfCourtesy", length: 30, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "titleOfCourtesy", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "city", length: 15, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "city", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "region", length: 15, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "region", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "country", length: 15, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "homePhone", length: 24, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "homePhone", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "fax", length: 24, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "fax", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "photo", default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "address", length: 60, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "postalCode", length: 10, default: () => null }),
    __metadata("design:type", String)
], Employee.prototype, "postalCode", void 0);
__decorate([
    typeorm_1.Column("date", { name: "birthDate", nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column("date", { name: "hireDate", nullable: true }),
    __metadata("design:type", Date)
], Employee.prototype, "hireDate", void 0);
__decorate([
    typeorm_1.Column("int", { name: "reportsTo", default: () => null }),
    __metadata("design:type", Number)
], Employee.prototype, "reportsTo", void 0);
Employee = __decorate([
    typeorm_1.Index("id", ["id"], { unique: true }),
    typeorm_1.Entity("employees", { schema: "dbo" })
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map