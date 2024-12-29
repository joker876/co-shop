import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';
import { Product } from './../../../shared/interfaces/product/product';

export class ProductRecord {
  public readonly id!: number;
  public readonly name!: string;
  public readonly checked!: boolean;
  public readonly listId!: number;

  constructor(data: RowDataPacket) {
    Object.assign(this, data);
  }

  toPublic(): Product {
    return {
      id: this.id,
      name: this.name,
      checked: this.checked,
      listId: this.listId,
    };
  }
}

export class ProductModel {
  static async findById(id: number): Promise<ProductRecord | undefined> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM products WHERE id = ? LIMIT 1;', [id]);
    if (res.err) {
      throw res.err;
    }
    return res.result[0] && new ProductRecord(res.result[0]);
  }
  static async getProductsByListId(listId: number): Promise<ProductRecord[]> {
    const res = await queryDb<RowDataPacket[]>('SELECT * FROM products WHERE parent_list_id = ?;', [listId]);
    if (res.err) {
      throw res.err;
    }
    return res.result.map(data => new ProductRecord(data));
  }
  static async addProduct(product: Product) {
    const res = await queryDb<ResultSetHeader>(
      'INSERT INTO products (name, checked, parent_list_id) VALUES (?, ?, ?);',
      [product.name, product.checked, product.listId]
    );
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
  static async removeProduct(id: number) {
    const res = await queryDb<ResultSetHeader>('DELETE FROM products WHERE id = ?;', [id]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
  static async setProductChecked(id: number, checked: boolean) {
    const res = await queryDb<ResultSetHeader>('UPDATE products SET checked = ? WHERE id = ?;', [checked, id]);
    if (res.err) {
      throw res.err;
    }
    return res.result;
  }
}
