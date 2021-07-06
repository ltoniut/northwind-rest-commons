import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('id', ['id'], { unique: true })
@Entity('orderDetails', { schema: 'dbo' })
export class OrderDetails {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'supplierID', default: () => null })
  supplierId: number;

  @Column('int', { name: 'categoryID', default: () => null })
  categoryId: number;

  @Column('int', { name: 'quantityPerUnit' })
  quantityPerUnit: number;

  @Column('int', { name: 'unitPrice' })
  unitPrice: number;

  @Column('int', { name: 'quantity', default: 0 })
  quantity: number;

  @Column('decimal', { name: 'discount', default: 0 })
  discount: number;
}
