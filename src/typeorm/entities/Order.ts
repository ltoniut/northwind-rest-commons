import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("orders", { schema: "dbo" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "orderDate", default: () => "sysdatetime()" })
  orderDate: Date;

  @Column("datetime", { name: "requiredDate", default: () => "sysdatetime()" })
  requiredDate: Date;

  @Column("datetime", { name: "shippedDate", default: () => "sysdatetime()" })
  shippedDate: Date;

  @Column("int", { name: "shipVia",  default: () => null })
  shipVia: number;

  @Column("decimal", { name: "freight",  default: () => null })
  freight: number;
  
  @Column("varchar", { name: "customerId", length: 40, default: () => null })
  customerId: string;
  
  @Column("varchar", { name: "shipName", length: 40, default: () => null })
  shipName: string;
  
  @Column("varchar", { name: "shipAddress", length: 60, default: () => null })
  shipAddress: string;
  
  @Column("varchar", { name: "shipCity", length: 15, default: () => null })
  shipCity: string;
  
  @Column("varchar", { name: "shipRegion", length: 15, default: () => null })
  shipRegion: string;
  
  @Column("varchar", { name: "shipPostalCode", length: 10, default: () => null })
  shipPostalCode: string;
  
  @Column("varchar", { name: "shipCountry", length: 15, default: () => null })
  shipCountry: string;
}
