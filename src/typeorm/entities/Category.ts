import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("id", ["id"], { unique: true })
@Entity("categories", { schema: "dbo" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "categoryName", length: 15, default: () => null })
  categoryName: string;

  @Column("varchar", { name: "description", default: () => null })
  description: string;

  @Column("longblob", { name: "picture", default: () => null })
  picture: string;
}
