import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("employees", { schema: "dbo" })
export class Employee {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "lastName", length: 20, default: () => null })
  lastName: string;

  @Column("varchar", { name: "firstName", length: 10, default: () => null })
  firstName: string;

  @Column("varchar", { name: "title", length: 30, default: () => null })
  title: string;

  @Column("varchar", { name: "titleOfCourtesy", length: 30, default: () => null })
  titleOfCourtesy: string;

  @Column("varchar", { name: "city", length: 15, default: () => null })
  city: string;

  @Column("varchar", { name: "region", length: 15, default: () => null })
  region: string;

  @Column("varchar", { name: "country", length: 15, default: () => null })
  country: string;

  @Column("varchar", { name: "homePhone", length: 24, default: () => null })
  homePhone: string;

  @Column("varchar", { name: "fax", length: 24, default: () => null })
  fax: string;

  @Column("varchar", { name: "photo", default: () => null })
  photo: string;

  @Column("varchar", { name: "address", length: 60, default: () => null })
  address: string;

  @Column("varchar", { name: "postalCode", length: 10, default: () => null })
  postalCode: string;

  @Column("date", { name: "birthDate", nullable: true })
  birthDate: Date | null;

  @Column("date", { name: "hireDate", nullable: true })
  hireDate: Date | null;

  @Column("int", { name: "reportsTo",  default: () => null })
  reportsTo: number;
}
