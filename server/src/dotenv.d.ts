declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string;
      readonly DB_URL: string;
    }
  }
}