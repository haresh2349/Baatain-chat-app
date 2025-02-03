import { Request, Response, NextFunction } from "express-serve-static-core";
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      console.log(err, "ererr")
    );
  };
};
