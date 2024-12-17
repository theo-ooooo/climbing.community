declare global {
  namespace Express {
    interface Request extends Express.Request {
      user: {
        memberId: number;
        provider: string;
      };
    }
  }
}
