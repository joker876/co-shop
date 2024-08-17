export interface UserRecord {
  readonly id: number;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly created_date: Date;
}
