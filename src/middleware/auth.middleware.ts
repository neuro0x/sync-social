import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  // Get the token from the request header
  const token = req.header("Authorization")?.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    ) as DecodedToken;

    // Attach the user ID to the request object
    req.userId = decodedToken.userId;

    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({ error: "Token is not valid, authorization denied" });
  }
};
