import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const token = req.header("Authorization")?.replace("Bearer ", ""); //gadipake soalnya udh pake cookie
      const token = req.cookies?.token;
      console.log(req.cookies, "cookies")
      console.log(token)
      if (!token) throw new Error("Unauthorized!");
  
      const verifiedUser = verify(token, process.env.JWT_KEY!);
  
      req.user = verifiedUser as {id: number};
        
      next();
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  };