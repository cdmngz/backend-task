declare namespace NodeJS {
  export interface ProcessEnv {
    IP_LIMIT: number;
    PORT: number;
    PRIVATE_KEY: string;
    TOKEN_LIMIT: number;
    TOKEN: string;
  }
}

declare namespace Express {
  export interface Request {
    userId: string;
  }
}
