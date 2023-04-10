import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./controllers/user.controller";
import socialProfileRoutes from "./controllers/socialProfile.controller";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/social-profiles", userRoutes);

// Catch-all route
app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
