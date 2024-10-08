export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_DATABASE: string;
      ACCESS_TOKEN_SECRET: string;
      JWT_TTL: string;
    }
  }
}
