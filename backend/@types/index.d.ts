declare global {
  namespace Express {
    interface Request {
      user: {
        memberId: number;
        provider: string;
      };
    }
  }
}

export {};
