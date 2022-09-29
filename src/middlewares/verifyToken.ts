import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "secrettoken";

export interface IPayload {
  id: string;
  name: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied");
    const payload = jwt.verify(token.split(" ")[1], PRIVATE_KEY) as IPayload;
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};
