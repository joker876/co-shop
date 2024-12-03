export const EnvironmentType = {
  Local: 'local',
  Staging: 'staging',
  Production: 'production',
} as const;
export type EnvironmentType = typeof EnvironmentType[keyof typeof EnvironmentType];

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string;
      readonly ENVIRONMENT: EnvironmentType;
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

