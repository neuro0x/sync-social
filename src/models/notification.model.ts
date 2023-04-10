import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

/**
 * The Notification model stores user notifications, which can include alerts for new insights,
 * reminders for scheduled posts, or updates on goal progress. It includes message, type, and read
 * status.
 */

export interface INotification extends Document {
  userId: IUser["_id"];
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Info", "Warning", "Error", "Success"],
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
