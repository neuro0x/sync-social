import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import analytics from "./controllers/analytics.controller";
import contentCalendar from "./controllers/contentCalendar.controller";
import contentSuggestion from "./controllers/contentSuggestion.controller";
import customAsset from "./controllers/customAsset.controller";
import goal from "./controllers/goal.controller";
import notification from "./controllers/notification.controller";
import postHistory from "./controllers/postHistory.controller";
import scheduledPost from "./controllers/scheduledPost.controller";
import socialProfile from "./controllers/socialProfile.controller";
import team from "./controllers/team.controller";
import template from "./controllers/template.controller";
import user from "./controllers/user.controller";
import userRole from "./controllers/userRole.controller";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/analytics", analytics);
app.use("/api/content-calendar", contentCalendar);
app.use("/api/content-suggestion", contentSuggestion);
app.use("/api/custom-asset", customAsset);
app.use("/api/goal", goal);
app.use("/api/notification", notification);
app.use("/api/post-history", postHistory);
app.use("/api/scheduled-post", scheduledPost);
app.use("/api/social-profile", socialProfile);
app.use("/api/team", team);
app.use("/api/template", template);
app.use("/api/user", user);
app.use("/api/user-role", userRole);

// Catch-all route
app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}.`);

  const db = await mongoose.connect(process.env.MONGODB_URI || "");
  console.log(`Connected to mongoDB: ${db.connection.name}`);
});
