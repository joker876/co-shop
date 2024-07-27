declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string;
      readonly APP_URL: string;

      readonly DB_USER: string;
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly DB_PASSWORD: string;
      readonly DB_DATABASE: string;
      
      readonly SESSION_SECRET: string;
      readonly SESSION_LENGTH: string;
    }
  }
}

export { };
