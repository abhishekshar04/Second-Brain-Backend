declare namespace NodeJS {
    export interface ProcessEnv {
      PORT?: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      origin: string;
    }
  }  