import mysql, { FieldPacket, QueryError, QueryResult } from 'mysql2';

export const connectToDb = () => mysql.createConnection(process.env.DB_URL!);

export const queryDb = async <T extends QueryResult = QueryResult>(
  queryString: string,
  args?: any[]
): Promise<{ err: QueryError | null; result: T; fields: FieldPacket[] }> => {
  return new Promise(resolve => {
    if (args) {
      connectToDb().query<T>(queryString, args, (err, result, fields) => {
        resolve({ err, result, fields });
      });
      return;
    }
    connectToDb().query<T>(queryString, (err, result, fields) => {
      resolve({ err, result, fields });
    });
  });
};
