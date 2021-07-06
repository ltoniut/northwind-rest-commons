import { Model } from 'schemas/model';

import Category from './category';
import Customer from './customer';
import Employee from './employee';
import Order from './order';
import OrderDetails from './orderdetails';
import Product from './product';
import Shipper from './shipper';
import Supplier from './supplier';

const schemas: Model[] = [
  Category,
  Customer,
  Employee,
  Order,
  OrderDetails,
  Product,
  Shipper,
  Supplier,
];

export function loadSchemas(): void {
  console.log(`Loading ${schemas.length} modules`);
}
export default schemas;
