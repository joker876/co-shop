import { FieldPacket, QueryError, RowDataPacket } from 'mysql2';
import { queryDb } from 'src/db';

export type ErrorResponse = {
  err: QueryError;
  result: undefined;
  fields: undefined;
};
export type SuccessResponse<T> = {
  err: null;
  result: (RowDataPacket & T)[];
  fields: FieldPacket[];
};

export type SelectResultPacket<T> = ErrorResponse | SuccessResponse<T>;

export type ExistsPacket = RowDataPacket & { readonly EXISTS: 1 | 0 };

export const newExistsQuery = async (table: string, whereClause: string, args?: any[]): Promise<boolean> => {
  const res = await queryDb<ExistsPacket[]>(
    `SELECT EXISTS(SELECT 1 FROM coshop.${table} WHERE ${whereClause} LIMIT 1) as 'EXISTS';`,
    args
  );
  if (res.err) {
    throw res.err;
  }
  return Boolean(res.result[0].EXISTS);
};
