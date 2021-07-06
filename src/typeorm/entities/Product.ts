import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("products", { schema: "dbo" })
export class Product {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "productName", length: 40, default: () => "space((1))" })
  productName: string;

  @Column("int", { name: "customerID",  default: () => null })
  customerId: number;

  @Column("int", { name: "categoryID",  default: () => null })
  categoryId: number;

  @Column("varchar", { name: "quantityPerUnit", length: 20, default: () => null })
  quantityPerUnit: string;

  @Column("decimal", { name: "unitPrice",  default: () => null })
  unitPrice: number;

  @Column("int", { name: "unitsInStock",  default: () => null })
  unitsInStock: number;

  @Column("int", { name: "unitsOnOrder",  default: () => null })
  unitsOnOrder: number;

  @Column("int", { name: "reorderLevel",  default: () => null })
  reorderLevel: number;

  @Column("tinyint", { name: "discontinued",  default: () => null })
  discontinued: number;
}
