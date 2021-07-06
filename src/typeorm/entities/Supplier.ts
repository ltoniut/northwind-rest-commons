import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("suppliers", { schema: "dbo" })
export class Supplier {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "companyName", length: 40, default: () => null })
  companyName: string;

  @Column("varchar", { name: "contactName", length: 30, default: () => null })
  contactName: string;

  @Column("varchar", { name: "contactTitle", length: 30, default: () => null })
  contactTitle: string;

  @Column("varchar", { name: "contactTitle", length: 30, default: () => null })
  title: string;

  @Column("varchar", { name: "address", length: 60, default: () => null })
  address: string;

  @Column("varchar", { name: "city", length: 15, default: () => null })
  city: string;

  @Column("varchar", { name: "region", length: 15, default: () => null })
  region: string;

  @Column("varchar", { name: "country", length: 15, default: () => null })
  country: string;

  @Column("varchar", { name: "postalCode", length: 10, default: () => null })
  postalCode: string;

  @Column("varchar", { name: "phone", length: 24, default: () => null })
  phone: string;

  @Column("varchar", { name: "fax", length: 24, default: () => null })
  fax: string;

  @Column("varchar", { name: "homePage", length: 10, default: () => null })
  homePage: string;
}
