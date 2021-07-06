import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("shippers", { schema: "dbo" })
export class Shipper {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "companyName", length: 40, default: () => null })
  companyName: string;

  @Column("varchar", { name: "phone", length: 24, default: () => null })
  phone: string;
}
