import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The ScheduledPost model represents posts that users have scheduled for future publishing. It
 * stores information like user ID, content, platform, scheduled time, and status.
 */

export interface IScheduledPost extends Document {
  userId: IUser["_id"];
  content: string;
  platform: string;
  scheduledTime: Date;
  status: string;
  errorMessage?: string;
}

const ScheduledPostSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  platform: {
    type: String,
    required: true,
    enum: ["Facebook", "Instagram", "Twitter", "YouTube"],
  },
  scheduledTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Scheduled", "Posted", "Error"],
    default: "Scheduled",
  },
  errorMessage: { type: String },
});

export default mongoose.model<IScheduledPost>(
  "ScheduledPost",
  ScheduledPostSchema
);
