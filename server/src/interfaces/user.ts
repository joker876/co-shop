export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly created_date: Date;
}
